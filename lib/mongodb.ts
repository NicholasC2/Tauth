import { Account, AccountDoc } from "@/src/Account";
import { App, AppDoc } from "@/src/App";
import { Session } from "@/src/Session";
import { MongoClient, ObjectId, WithId } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  var mongoClient: MongoClient | undefined;
}

const client =
  global.mongoClient ??
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  global.mongoClient = client;
}

await client.connect();

export const db = client.db();

export async function saveAccount(account: Account) {
  const accounts = db.collection<AccountDoc>("accounts");

  await accounts.updateOne(
    { username: account.username },
    {
      $set: {
        publicKey: account.publicKey,
      },
      $setOnInsert: {
        username: account.username,
        createdAt: account.createdAt,
      },
    },
    {
      upsert: true,
    }
  );
}

export async function getAccount(sessionID: ObjectId): Promise<Account | null> {
  const accounts = db.collection<AccountDoc>("accounts");

  const account = await accounts.findOne({
    "sessions._id": sessionID
  });

  if(account) {
    return new Account(account.username, account.publicKey, account.createdAt, account.sessions);
  } else {
    return null
  }
}

export async function deleteAccount(username: string) {
  const accounts = db.collection<AccountDoc>("accounts");

  await accounts.deleteOne({ 
    username: username 
  });
}

export async function saveApp(app: App) {
  const apps = db.collection<AppDoc>("apps");

  await apps.updateOne(
    { _id: app._id },
    {
      $set: {
        owner: app.owner,
        name: app.name
      },
      $setOnInsert: {
        _id: app._id,
        createdAt: app.createdAt
      },
    },
    {
      upsert: true,
    }
  );
}

export async function getApp(ID: ObjectId): Promise<WithId<App> | null> {
  const apps = db.collection<AppDoc>("apps");

  const app = await apps.findOne({
    _id: ID
  });

  if(app) {
    return new App(app.name, app.owner, app.createdAt, app._id);
  } else {
    return null
  }
}

export async function deleteApp(id: ObjectId) {
  const apps = db.collection<AppDoc>("apps");

  await apps.deleteOne({ 
    _id: id
  });
}