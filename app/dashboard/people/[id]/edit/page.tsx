import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import EditPersonForm from "@/app/ui/people/edit-form";
import { fetchPersonById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const person = await fetchPersonById(id);

  if (!person) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "People", href: "/dashboard/people" },
          {
            label: "Edit Invoice",
            href: `/dashboard/people/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPersonForm person={person} />
    </main>
  );
}
