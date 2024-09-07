import { auth } from "@/auth";
import { createTheme, MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </MantineProvider>
  );
}
