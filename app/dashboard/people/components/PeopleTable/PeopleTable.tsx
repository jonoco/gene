"use client";

import { Table, Text, Button } from "@mantine/core";
import { PeopleTable } from "@/app/lib/definitions";
import { ancestryToString } from "@/app/lib/people";
import { formatDateToLocal } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { UpdatePerson } from "@/app/ui/people/buttons";
import Link from "next/link";

export default function PeopleTable({ people }: { people: PeopleTable[] }) {
  const session = useSession();

  const rows = people.map((person) => {
    return (
      <Table.Tr key={person.id}>
        <Table.Td>
          <Button
            component={Link}
            href={`/dashboard/people/${person.id}`}
            variant="subtle"
          >
            <Text>
              {person.name} {person.surname}
            </Text>
          </Button>
        </Table.Td>

        <Table.Td>
          <Text>{formatDateToLocal(person.birth_date)}</Text>
        </Table.Td>

        <Table.Td>
          <Text>{ancestryToString(person.ancestry)}</Text>
        </Table.Td>
        <Table.Td>
          {!!session.data?.user && <UpdatePerson id={person.id} />}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table verticalSpacing="xs">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Birthdate</Table.Th>
          <Table.Th>Ancestry</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
