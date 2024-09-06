"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  // amount: z.coerce.number(),
  ancestry: z.enum(["C", "S"], {
    invalid_type_error: "Please select an Ancestry.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    ancestry?: string[];
  };
  message?: string | null;
};

const CreatePerson = FormSchema.omit({ id: true, date: true });
export async function createPerson(prevState: State, formData: FormData) {
  // const rawFormData = Object.fromEntries(formData.entries())

  const validatedFields = CreatePerson.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    ancestry: formData.get("ancestry"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Person.",
    };
  }

  try {
    // await sql`
    //     INSERT INTO people (record, father, mother, sibling, spouse, child, gender, surname, name, maiden_name, birth_date, marriage_date, death_date, photo, photo_url, born_in, married_in, died_in, ssn, comments, entry_date, ancestry)
    //     VALUES (${person[1]}, ${person[2]}, ${person[3]}, ${person[4]}, ${person[5]}, ${person[6]}, ${person[7]}, ${person[8]}, ${person[9]}, ${person[10]}, ${person[11]}, ${person[12]}, ${person[13]}, ${person[14]}, ${person[15]}, ${person[16]}, ${person[17]}, ${person[18]}, ${person[19]}, ${person[20]}, ${person[21]}, ${person[22]})
    //     ON CONFLICT (record) DO NOTHING;
    //     `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Person.",
    };
  }

  revalidatePath("/dashboard/people");
  redirect("/dashboard/people");
}

const UpdatePerson = FormSchema.omit({ id: true, date: true });
export async function updatePerson(id: string, formData: FormData) {
  const { name, surname, ancestry } = UpdatePerson.parse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    ancestry: formData.get("ancestry"),
  });

  try {
    await sql`
      UPDATE people
      SET name = ${name}, surname = ${surname}, ancestry = ${ancestry}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Person.",
    };
  }

  revalidatePath("/dashboard/people");
  redirect("/dashboard/people");
}

export async function deletePerson(id: string) {
  try {
    await sql`DELETE FROM people WHERE id = ${id}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Person.",
    };
  }

  revalidatePath("/dashboard/people");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
