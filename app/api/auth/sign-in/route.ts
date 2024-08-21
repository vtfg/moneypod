import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { prisma } from "~/lib/prisma";

type SignInRequestDTO = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignInRequestDTO;

    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    if (body.password !== user.password) {
      throw new Error("Credenciais inválidas.");
    }

    const token = jwt.sign({ id: user.id }, "secret_key");
    cookies().set("token", token);

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
