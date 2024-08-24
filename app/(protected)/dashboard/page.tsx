import { use } from "react";

import { createClient } from "~/lib/supabase/server";

export default function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = use(supabase.auth.getUser());

  return (
    <>
      <p className="text-lg tracking-tight">
        Olá, {user?.user_metadata.first_name}!
      </p>
    </>
  );
}
