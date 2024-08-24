import { createClient } from "~/lib/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <p className="text-lg tracking-tight">
        Olá, {user?.user_metadata.first_name}!
      </p>
    </>
  );
}
