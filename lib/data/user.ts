import { createClient } from "~/lib/supabase/server";

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserTransactions() {
  const supabase = createClient();

  const { data, error } = await supabase.from("transactions").select();

  if (error) {
    console.error(error);
    throw new Error("Internal server error");
  }

  return data;
}
