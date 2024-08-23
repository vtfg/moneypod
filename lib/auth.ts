import { cookies } from "next/headers";

export function authenticated(): boolean {
  const token = cookies().get("token");

  if (!token) return false;

  return true;
}
