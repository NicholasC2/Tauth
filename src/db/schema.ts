import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  name: text("name").notNull().unique(),
  passwordHash: text("passwordHash").notNull()
});
