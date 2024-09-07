import { Button, Divider, Flex } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import Link from "next/link";

import Logo from "@/app/ui/components/logo";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { auth, signOut } from "@/auth";
import classes from "./SideNav.module.css";

export default async function SideNav() {
  const session = await auth();

  function SignInOut() {
    if (!!session?.user) {
      return (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            leftSection={<IconLogout />}
            variant="subtle"
            justify="left"
            fullWidth
          >
            Sign Out
          </Button>
        </form>
      );
    } else {
      return (
        <Button
          component={Link}
          href="/login"
          leftSection={<IconLogin />}
          variant="subtle"
          justify="left"
          fullWidth
        >
          Sign In
        </Button>
      );
    }
  }

  return (
    <nav className={classes.navbar}>
      <Flex className={classes.header}>
          <Logo />
      </Flex>

      <div className={classes.navbarMain}>
        <Divider my="md" />
        <NavLinks />
      </div>

      <div className={classes.footer}>
        <SignInOut />
      </div>
    </nav>
  );
}
