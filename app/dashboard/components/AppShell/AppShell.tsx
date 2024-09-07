"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function DashboardShell({
  children,
  sideNav,
}: {
  children: React.ReactNode;
  sideNav: React.ReactNode;
}) {
  const [opened] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar h="100vh">
        {sideNav}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
