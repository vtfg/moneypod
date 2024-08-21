import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "~/lib/prisma";

type SignUpRequestDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignUpRequestDTO;

    const hashPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, "secret_key");
    cookies().set("token", token);

    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
