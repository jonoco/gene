"use client";

import { PeopleTable } from "@/app/lib/definitions";
import { CheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import { updatePerson } from "@/app/lib/actions";

export default function EditPersonForm({ person }: { person: PeopleTable }) {
  const updatePersonWithId = updatePerson.bind(null, person.id);

  return (
    <form action={updatePersonWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="alphabetical"
                placeholder="First and middle names"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={person.name}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="surname" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="surname"
                name="surname"
                type="alphabetical"
                placeholder="Last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={person.surname}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Ancestry Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Choose an ancestry
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="cox"
                  name="ancestry"
                  type="radio"
                  value="C"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={person.ancestry === "C"}
                />
                <label
                  htmlFor="cox"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Cox <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="stuth"
                  name="ancestry"
                  type="radio"
                  value="S"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={person.ancestry === "S"}
                />
                <label
                  htmlFor="stuth"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Stuth <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/people"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Person</Button>
        {/* <DeletePerson id={person.id} /> */}
      </div>
    </form>
  );
}
