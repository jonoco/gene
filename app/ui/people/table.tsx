import Image from "next/image";
import { UpdatePerson, DeletePerson } from "@/app/ui/people/buttons";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredPeople } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const people = await fetchFilteredPeople(query, currentPage);
  const session = await auth();

  function mobileTable() {
    return (
      <div className="md:hidden">
        {people?.map((person) => (
          <div key={person.id} className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p>
                    {person.name} {person.surname}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{person.surname}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>{formatDateToLocal(person.birth_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function desktopTable() {
    return (
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Birthdate
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {people?.map((person) => (
            <tr
              key={person.id}
              className={`w-full border-b py-3 text-sm last-of-type:border-none 
                [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  <p>
                    {person.name} {person.surname}
                  </p>
                </div>
              </td>

              <td className="whitespace-nowrap px-3 py-3">
                {formatDateToLocal(person.birth_date)}
              </td>

              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  {!!session?.user && <UpdatePerson id={person.id} />}
                  {/* <DeletePerson id={person.id} /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {mobileTable()}
          {desktopTable()}
        </div>
      </div>
    </div>
  );
}
