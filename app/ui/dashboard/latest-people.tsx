import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { LatestPerson } from "@/app/lib/definitions";
import { Button, Stack, Text } from "@mantine/core";
import Link from "next/link";

export default async function LatestPeople({
  latestPeople,
}: {
  latestPeople: LatestPerson[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest People
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <Stack justify="left">
            {latestPeople.map((person, i) => {
              return (
                <Button
                  component={Link}
                  href={`/dashboard/people/${person.id}`}
                  variant="subtle"
                  justify="left"
                  key={i}
                  fullWidth
                >
                  <Text>{person.full_name}</Text>
                </Button>
              );
            })}
          </Stack>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
