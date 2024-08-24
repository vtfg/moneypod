"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  function handleSignOut() {
    supabase.auth.signOut();
    router.push("/sign-in");
  }

  return <Button onClick={handleSignOut}>Sair</Button>;
}
