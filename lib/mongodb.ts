import "server-only";
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