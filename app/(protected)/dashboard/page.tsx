import { use } from "react";

import { SignOutButton } from "~/components/sign-out-button";
import { createClient } from "~/lib/supabase/server";

export default function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = use(supabase.auth.getUser());

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-lg tracking-tight">
        Olá, {user?.user_metadata.first_name}!
      </p>
      <SignOutButton />
    </main>
  );
}
