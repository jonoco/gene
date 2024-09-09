import { Card } from "@/app/ui/dashboard/cards";
import LatestPeople from "@/app/ui/dashboard/latest-people";
import { lusitana } from "@/app/ui/fonts";
import { countPeople, fetchLatestPeople } from "@/app/lib/data";

export default async function Page() {
  const latestPeople = await fetchLatestPeople();
  const numberOfPeople = await countPeople();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total People" value={numberOfPeople} type="people" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestPeople latestPeople={latestPeople} />
      </div>
    </main>
  );
}
