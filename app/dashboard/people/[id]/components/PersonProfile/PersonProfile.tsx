"use client";

import { PeopleTableType, SiblingType } from "@/app/lib/definitions";
import { ancestryToString, genderToString } from "@/app/lib/people";
import { formatDateToLocal } from "@/app/lib/utils";
import {
  Stack,
  Text,
  Title,
  List,
  Container,
  Group,
  Flex,
  Button,
} from "@mantine/core";
import Link from "next/link";

export default function PersonProfile({
  person,
  siblings,
}: {
  person: PeopleTableType;
  siblings: SiblingType[];
}) {
  return (
    <Stack>
      <Title order={1}>
        {person.name} {person.surname}
      </Title>

      <ProfileList person={person} />

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
                  {sibling.sibling_name}
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

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Container w="100%">
      <Stack>
        <Title order={3} c="gray">
          {title}
        </Title>
        {children}
      </Stack>
    </Container>
  );
}
