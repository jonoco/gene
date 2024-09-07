import { sql } from "@vercel/postgres";
import {
  CustomerField,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  PeopleTableType,
  Person,
  SiblingType,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function countPeople() {
  try {
    const data = await sql`SELECT COUNT(*) FROM people`;

    return Number(data.rows[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to count people.");
  }
}

export async function fetchLatestPeople() {
  try {
    const data =
      await sql`SELECT * FROM people ORDER BY created_at DESC LIMIT 5`;

    return data.rows.map((person) => ({
      id: person.id,
      name: person.name,
      surname: person.surname,
      birth_date: person.birth_date,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest people.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchFullPersonById(id: string) {
  try {
    const data = await sql<Person>`
      WITH siblings AS (
      SELECT 
          p2.name AS sibling_name
      FROM 
          people p1
      JOIN 
          people p2
      ON 
          p1.id != p2.id
      AND 
          (p1.father_id = p2.father_id AND p1.father_id IS NOT NULL
          OR
          p1.mother_id = p2.mother_id AND p1.mother_id IS NOT NULL)
      WHERE 
          p1.id = ${id}
      )
      SELECT 
          p.name AS person_name,
          father.name AS father_name,
          mother.name AS mother_name,
          siblings.sibling_name
      FROM 
          people p
      LEFT JOIN 
          people father ON p.father_id = father.id
      LEFT JOIN 
          people mother ON p.mother_id = mother.id
      LEFT JOIN 
          siblings ON TRUE  -- Cartesian join to list all siblings
      WHERE 
          p.id = ${id};
    `;
    
    const person = data.rows.map((person) => ({
      ...person,
    }));
    
    return person[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch person.");
  }
}

export async function fetchPersonById(id: string) {
  try {
    const data = await sql<PeopleTableType>`
      SELECT
        id,
        name,
        surname,
        maiden_name,
        gender,
        birth_date,
        marriage_date,
        death_date,
        born_in,
        married_in,
        died_in,
        ancestry,
        comments,
        father_id,
        mother_id,
        spouse_id
      FROM people
      WHERE id = ${id};
    `;

    const person = data.rows.map((person) => ({
      ...person,
    }));

    return person[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch person.");
  }
}

export async function fetchSiblings(id: string) {
  try {
    const data = await sql<SiblingType>`
      WITH sibling_pairs AS (
        SELECT 
          p2.id AS sibling_id,
          p2.name||' '||p2.surname AS sibling_name
        FROM 
          people p1
        JOIN 
          people p2
        ON 
          p1.id != p2.id  -- Ensure they are not the same person
        AND 
          (p1.father_id = p2.father_id AND p1.father_id IS NOT NULL
          OR
          p1.mother_id = p2.mother_id AND p1.mother_id IS NOT NULL)
        WHERE 
          p1.id = ${id}
      )
      SELECT DISTINCT sibling_name, sibling_id
      FROM sibling_pairs
      ORDER BY sibling_name ASC;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch siblings.");
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

const PEOPLE_PER_PAGE = 10;
export async function fetchFilteredPeople(query: string, currentPage: number) {
  const offset = (currentPage - 1) * PEOPLE_PER_PAGE;

  try {
    const data = await sql<PeopleTableType>`
      SELECT
        people.id,
        people.name,
        people.surname,
        people.birth_date,
        people.ancestry
      FROM people
      WHERE
        people.name ILIKE ${`%${query}%`} OR
        people.surname ILIKE ${`%${query}%`}
      ORDER BY people.created_at DESC
      LIMIT ${PEOPLE_PER_PAGE} OFFSET ${offset}
    `;

    const people = data.rows.map((person) => ({
      ...person,
      // birth_date: formatDate(person.birth_date),
    }));

    return people;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch people table.");
  }
}

export async function fetchPeoplePages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM people
    WHERE
      people.name ILIKE ${`%${query}%`} OR
      people.surname ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / PEOPLE_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of people.");
  }
}
