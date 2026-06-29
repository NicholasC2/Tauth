import { db } from "@/lib/mongodb";
import { Account, AccountDoc } from "@/src/Account";
import { ErrorTypes } from "@/src/Errors";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const accounts = db.collection<AccountDoc>("accounts");

export async function POST(req: Request) {
    const { username, publicKey } = await req.json();

    if(username.trim().length === 0) {
        return NextResponse.json({
            error: ErrorTypes.USERNAME_INVALID
        })
    }

    if(await accounts.findOne({username})) {
        return NextResponse.json({
            error: ErrorTypes.USERNAME_TAKEN
        })
    }

    const session = {
        createdAt: new Date(),
        id: randomUUID()
    }

    const newAccount = new Account(username, publicKey, new Date(), [session])

    await accounts.insertOne(newAccount);

    const response = NextResponse.json({
        success: true
    });

    response.cookies.set("sessionID", session.id, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });

    response.headers.set("Location", "./");

    return response;
}