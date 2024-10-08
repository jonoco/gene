import { deletePerson } from "@/app/lib/actions";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

export function CreatePerson() {
  return (
    <Link
      href="/dashboard/people/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add a person</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePerson({ id }: { id: string }) {
  return (
    <Button
      component={Link}
      href={`/dashboard/people/${id}/edit`}
      variant="subtle"
      leftSection={<IconPencil className="w-5" />}
    >
      Edit
    </Button>
  );
}

export function DeletePerson({ id }: { id: string }) {
  const deletePersonWithId = deletePerson.bind(null, id);

  return (
    <form action={deletePersonWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
