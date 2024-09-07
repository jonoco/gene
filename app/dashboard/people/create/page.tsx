import Form from "@/app/ui/people/create-form";
import Breadcrumbs from "@/app/ui/components/breadcrumbs";

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "People", href: "/dashboard/people" },
          {
            label: "Add Person",
            href: "/dashboard/people/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
