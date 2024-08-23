import { use } from "react";

import { getUserInformation } from "~/lib/auth";

export default function Dashboard() {
  const user = use(getUserInformation());

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-lg tracking-tight">Olá, {user.firstName}!</p>
    </main>
  );
}
