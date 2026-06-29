import { checkUsername } from "@/repositories/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username } = await req.json();

  return NextResponse.json({
    exists: await (username),
  });
}