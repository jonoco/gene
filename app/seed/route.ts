import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";
// import { people } from "./people_data";
/*
const client = await db.connect();

function nullableValue(value: number | string | undefined) {
  return value === undefined ? "NULL" : value;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedPeople(start: number, end: number) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await client.sql`
  //   DROP TABLE IF EXISTS people;
  // `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS people (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      record INT NOT NULL UNIQUE,
      father INT DEFAULT NULL,
      mother INT DEFAULT NULL,
      sibling INT DEFAULT NULL,
      spouse INT DEFAULT NULL,
      child INT DEFAULT NULL,
      gender TEXT DEFAULT NULL,
      surname TEXT DEFAULT NULL,
      name TEXT DEFAULT NULL,
      maiden_name TEXT DEFAULT NULL,
      birth_date TIMESTAMP DEFAULT NULL,
      marriage_date TIMESTAMP DEFAULT NULL,
      death_date TIMESTAMP DEFAULT NULL,
      photo INT DEFAULT 0,
      photo_url TEXT DEFAULT NULL,
      born_in TEXT DEFAULT NULL,
      married_in TEXT DEFAULT NULL,
      died_in TEXT DEFAULT NULL,
      ssn TEXT DEFAULT NULL,
      comments TEXT DEFAULT NULL,
      entry_date TIMESTAMP DEFAULT NULL,
      ancestry TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedPeople = await Promise.all(
    people.slice(start, end).map(
      (person) => client.sql`
      INSERT INTO people (record, father, mother, sibling, spouse, child, gender, surname, name, maiden_name, birth_date, marriage_date, death_date, photo, photo_url, born_in, married_in, died_in, ssn, comments, entry_date, ancestry)
      VALUES (${person[1]}, ${person[2]}, ${person[3]}, ${person[4]}, ${person[5]}, ${person[6]}, ${person[7]}, ${person[8]}, ${person[9]}, ${person[10]}, ${person[11]}, ${person[12]}, ${person[13]}, ${person[14]}, ${person[15]}, ${person[16]}, ${person[17]}, ${person[18]}, ${person[19]}, ${person[20]}, ${person[21]}, ${person[22]})
      ON CONFLICT (record) DO NOTHING;
      `
    )
  );

  
  // const insertedPeople = await Promise.all(
  //   people.slice(start, end).map(
  //     (person) => client.sql`
  //       INSERT INTO people (record, father, mother, sibling, spouse, child, gender, surname, name, maiden_name, birth_date, marriage_date, death_date, photo, photo_url, born_in, married_in, died_in, ssn, comments, entry_date, ancestry)
  //       VALUES (${person[1]}, ${nullableValue(person[2])}, ${nullableValue(person[3])}, ${nullableValue(person[4])}, ${nullableValue(person[5])}, ${nullableValue(person[6])}, ${nullableValue(person[7])}, ${nullableValue(person[8])}, ${nullableValue(person[9])}, ${nullableValue(person[10])}, ${nullableValue(person[11])}, ${nullableValue(person[12])}, ${nullableValue(person[13])}, ${nullableValue(person[14])}, ${nullableValue(person[15])}, ${nullableValue(person[16])}, ${nullableValue(person[17])}, ${nullableValue(person[18])}, ${nullableValue(person[19])}, ${nullableValue(person[20])}, ${nullableValue(person[21])}, ${nullableValue(person[22])})
  //       ON CONFLICT (record) DO NOTHING;
  //     `,
  //   ),
  // );

  return insertedPeople;
}

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
  return Response.json({ message: "Seeding disabled" });

  const starting_batch = 0;

  const start_time = new Date().getTime();

  try {
    await seedBatchPeople(starting_batch, starting_batch);
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error("Database Error:", error);
    return Response.json({ error }, { status: 500 });
  }

  const delta_time = new Date().getTime() - start_time;
  console.log(`Time to seed: ${delta_time}ms`);

  // try {
  //   await client.sql`BEGIN`;
  // //   // await seedUsers();
  //   await seedPeople(0, 0);
  // //   // await seedCustomers();
  // //   // await seedInvoices();
  // //   // await seedRevenue();
  //   await client.sql`COMMIT`;
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   console.error("Database Error:", error);
  //   return Response.json({ error }, { status: 500 });
  // }

  return Response.json({ message: "Database seeded successfully" });
}

async function seedBatchPeople(startingBatch: number, batchNumber: number) {
  const numberOfBatches = 10;
  const batchSize = 200;

  const start = (batchNumber * batchSize);            // 0, 5, 10
  const end = (batchNumber * batchSize) + batchSize;  // 5, 10, 15
  
  console.log(`Seeding batch ${batchNumber} from ${start} to ${end}`);
  
  try {
    await client.sql`BEGIN`;
    await seedPeople(start, end);
    await client.sql`COMMIT`;
  } catch (error) {
    await client.sql`ROLLBACK`;
    throw error;
  }

  batchNumber++;
  if (batchNumber < startingBatch + numberOfBatches) {
    return await seedBatchPeople(startingBatch, batchNumber);
  }
}

*/