import PersonProfile from "@/app/dashboard/people/[id]/components/PersonProfile/PersonProfile";
import { fetchFullPersonById, fetchSiblings } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const person = await fetchFullPersonById(id);
  const siblings = await fetchSiblings(id);

  if (!person) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "People", href: "/dashboard/people" },
          {
            label: "View Details",
            href: `/dashboard/people/${id}`,
            active: true,
          },
        ]}
      />

      <PersonProfile person={person} siblings={siblings} />
    </main>
  );
}
