import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export function authenticated(): boolean {
  const token = cookies().get("token");

  if (!token) return false;

  return true;
}

export async function getUserInformation(): Promise<User> {
  const token = cookies().get("token");

  const response = await fetch("http://localhost:3000/api/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    return redirect("/sign-in");
  }

  const data = await response.json();

  return data as User;
}
