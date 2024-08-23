import { type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import { prisma } from "~/lib/prisma";

interface JWTPayload {
  id: string;
  exp: number;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization");

    if (!token || !token.includes("Bearer")) {
      throw new Error("Token inválido.");
    }

    const { id, exp } = jwt.decode(token.split("Bearer ")[1]) as JWTPayload;

    if (Date.now() >= exp * 1000) {
      throw new Error("Token inválido.");
    }

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new Error("Token inválido.");
    }

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
