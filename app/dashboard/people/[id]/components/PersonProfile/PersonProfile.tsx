"use client";

import {
  ChildrenType,
  FullPerson,
  PeopleTableType,
  SiblingType,
} from "@/app/lib/definitions";
import { ancestryToString, genderToString } from "@/app/lib/people";
import { formatDateToLocal } from "@/app/lib/utils";
import { Stack, Text, Title, List, Group, Flex, Button } from "@mantine/core";
import Link from "next/link";

export default function PersonProfile({
  person,
  siblings,
  kinder,
}: {
  person: FullPerson;
  siblings: SiblingType[];
  kinder: ChildrenType[];
}) {
  return (
    <Stack>
      <Title order={1}>{person.full_name}</Title>

      <ProfileList person={person} />

      <Group>
        <Flex w="10rem">Father:</Flex>
        {!person.father_id && <Text>Father unknown</Text>}
        {!!person.father_id && (
          <Button
            variant="subtle"
            component={Link}
            href={`/dashboard/people/${person.father_id}`}
          >
            {person.father_name ?? "Unknown father name"}
          </Button>
        )}
      </Group>

      <Group>
        <Flex w="10rem">Mother:</Flex>
        {!person.mother_id && <Text>Mother unknown</Text>}
        {!!person.mother_id && (
          <Button
            variant="subtle"
            component={Link}
            href={`/dashboard/people/${person.mother_id}`}
          >
            {person.mother_name ?? "Unknown mother name"}
          </Button>
        )}
      </Group>

      <Group>
        <Flex w="10rem">Spouse:</Flex>
        {!person.spouse_id && <Text>Spouse unknown</Text>}
        {!!person.spouse_id && (
          <Button
            variant="subtle"
            component={Link}
            href={`/dashboard/people/${person.spouse_id}`}
          >
            {person.spouse_name ?? "Unknown spouse name"}
          </Button>
        )}
      </Group>

      <Group>
        <Flex w="10rem">Children:</Flex>
        {kinder.length == 0 && <Text>No children</Text>}
        {kinder.length > 0 && (
          <List>
            {kinder.map((child) => (
              <List.Item key={child.child_id}>
                <Button
                  variant="subtle"
                  component={Link}
                  href={`/dashboard/people/${child.child_id}`}
                >
                  {child.child_name ?? "Unknown child name"}
                </Button>
              </List.Item>
            ))}
          </List>
        )}
      </Group>
      
      <Group>
        <Flex w="10rem">Siblings:</Flex>
        {siblings.length == 0 && <Text>No siblings</Text>}
        {siblings.length > 0 && (
          <List>
            {siblings.map((sibling) => (
              <List.Item key={sibling.sibling_id}>
                <Button
                  variant="subtle"
                  component={Link}
                  href={`/dashboard/people/${sibling.sibling_id}`}
                >
                  {sibling.sibling_name ?? "Unknown sibling name"}
                </Button>
              </List.Item>
            ))}
          </List>
        )}
      </Group>
    </Stack>
  );
}

function ProfileList({ person }: { person: PeopleTableType }) {
  return (
    <List spacing="lg" size="md" center>
      {!!person.maiden_naame && (
        <ListItem title="Maiden Name" content={person.maiden_naame} />
      )}
      <ListItem title="Gender" content={genderToString(person.gender)} />
      <ListItem title="Ancestry" content={ancestryToString(person.ancestry)} />
      <ListItem title="Born In" content={person.born_in} />
      <ListItem
        title="Birthdate"
        content={formatDateToLocal(person.birth_date)}
      />
      <ListItem title="Married In" content={person.married_in} />
      <ListItem
        title="Marriage Date"
        content={formatDateToLocal(person.marriage_date)}
      />
      <ListItem title="Died In" content={person.died_in} />
      <ListItem
        title="Death Date"
        content={formatDateToLocal(person.death_date)}
      />
    </List>
  );
}

function ListItem({ title, content }: { title: string; content?: string }) {
  const hasContent =
    content !== undefined && content !== null && content !== "";

  return (
    <List.Item>
      <Group>
        <Flex w="10rem">{title}:</Flex>
        <Flex>{hasContent ? content : "Unknown"}</Flex>
      </Group>
    </List.Item>
  );
}
