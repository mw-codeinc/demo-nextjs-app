import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const pool = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	authId: text("authId"),
	authSource: text("authSource"),
	firstName: text("firstName"),
	lastName: text("lastName"),
	email: text("email").unique(),
	username: text("username"),
	phoneNumber: text("phoneNumber"),
	image: text("image"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const integrations = pgTable("integrations", {
	id: serial("id").primaryKey(),
	userId: integer("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	username: text("username"),
	provider: text("provider").notNull(),
	refreshToken: text("refreshToken"),
	accessToken: text("accessToken"),
	expiresAt: integer("expiresAt"),
	tokenType: text("tokenType"),
	scope: text("scope"),
});
