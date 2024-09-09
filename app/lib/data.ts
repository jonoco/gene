import { sql } from "@vercel/postgres";
import { ChildrenType, FullPerson, LatestPerson, PeopleTableType, SiblingType } from "./definitions";

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
    const data = await sql<LatestPerson>`
      SELECT
        id,
        name||' '||surname AS full_name,
        birth_date,
        ancestry
      FROM 
        people 
      ORDER BY 
        created_at DESC LIMIT 5
      `;

    return data.rows.map((person) => ({
      id: person.id,
      full_name: person.full_name,
      ancestry: person.ancestry,
      birth_date: person.birth_date,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest people.");
  }
}

export async function fetchFullPersonById(id: string) {
  try {
    const data = await sql<FullPerson>`
      SELECT 
          p.id,
          p.name||' '||p.surname AS full_name,
          p.maiden_name,
          p.gender,
          p.birth_date,
          p.marriage_date,
          p.death_date,
          p.born_in,
          p.married_in,
          p.died_in,
          p.ancestry,
          father.name||' '||father.surname AS father_name,
          mother.name||' '||mother.surname AS mother_name,
          spouse.name||' '||spouse.surname AS spouse_name,
          p.father_id,
          p.mother_id,
          p.spouse_id
      FROM 
          people p
      LEFT JOIN 
          people father ON p.father_id = father.id
      LEFT JOIN 
          people mother ON p.mother_id = mother.id
      LEFT JOIN
          people spouse ON p.spouse_id = spouse.id    
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

export async function fetchChildren(id: string) {
  try {
    const data = await sql<ChildrenType>`
      SELECT
        p.id AS child_id,
        p.name||' '||p.surname AS child_name,
        p.birth_date AS child_birth_date
      FROM
        people p
      WHERE
        p.father_id = ${id} OR p.mother_id = ${id}
      ORDER BY p.birth_date DESC;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch children.");
  }
}

export async function fetchSiblings(id: string) {
  try {
    const data = await sql<SiblingType>`
      WITH sibling_pairs AS (
        SELECT 
          p2.id AS sibling_id,
          p2.name||' '||p2.surname AS sibling_name,
          p2.birth_date AS sibling_birth_date
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
      SELECT DISTINCT sibling_name, sibling_id, sibling_birth_date
      FROM sibling_pairs
      ORDER BY sibling_birth_date DESC;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch siblings.");
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
