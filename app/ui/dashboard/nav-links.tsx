"use client";

import { NavLink } from "@mantine/core";
import { IconFriends, IconHome } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: IconHome },
  { name: "People", href: "/dashboard/people", icon: IconFriends },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <NavLink
            key={link.name}
            href={link.href}
            label={link.name}
            active={link.href === pathname}
            leftSection={<LinkIcon size="1rem" stroke={1.5} />}
          />
        );
      })}
    </>
  );
}
