import { Metadata } from "next";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Provider from "@/app/providers/provider";

export const metadata: Metadata = {
  title: "Cox & Stuth Genealogy",
  description: "Genealogy research for the Cox and Stuth families.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
