import { type NextRequest } from "next/server";

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

    const user = await prisma.user.create({ data: body });

    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
