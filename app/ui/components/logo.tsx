import { Stack, Text } from "@mantine/core";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard">
      <Stack align="flex-start" justify="flex-end" p="sm" c="white" gap="xs">
        <Text size="2rem">Cox &</Text>
        <Text size="2rem">Stuth</Text>
        <Text size="1.8rem">Genealogy</Text>
      </Stack>
    </Link>
  );
}
