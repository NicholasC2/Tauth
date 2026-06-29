import { db } from "@/lib/mongodb";
import { AccountDoc } from "@/src/Account";
import { NextResponse } from "next/server";

const accounts = db.collection<AccountDoc>("accounts");

export async function POST(req: Request) {
  const { username } = await req.json();

  return NextResponse.json({
    exists: (!!await accounts.findOne({username})),
  });
}