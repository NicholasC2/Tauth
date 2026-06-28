import { Session } from "./Session";

export class Account {
    username: string;
    publicKey: string;
    createdAt: Date;
    sessions: Session[];

    constructor(
        username: string,
        publicKey: string,
        createdAt: Date,
        sessions?: Session[]
    ) {
        this.username = username;
        this.publicKey = publicKey;
        this.createdAt = createdAt;
        this.sessions = sessions ?? [];
    }
}

export type AccountDoc = {
    username: string;
    publicKey: string;
    createdAt: Date;
    sessions: Session[];
};

export function toAccount(account: AccountDoc): Account {
  return new Account(account.username, account.publicKey, account.createdAt, account.sessions);
}