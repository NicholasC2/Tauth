import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    db.insert(users).values({
        name: String(body.name),
        passwordHash: String(body.passwordHash)
    })

    return NextResponse.json({
        success: true
    })
}
