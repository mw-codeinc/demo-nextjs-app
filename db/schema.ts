import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const pool = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	authId: text("authId"),
	authSource: text("authSource"),
	name: text("name"),
	firstName: text("firstName"),
	lastName: text("lastName"),
	email: text("email").unique(),
	username: text("username"),
	phoneNumber: text("phoneNumber"),
	image: text("image"),
	emailVerified: timestamp("emailVerified").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	idToken: text("id_token"),
	type: text("type"),
	provider: text("provider"),
	providerAccountId: text("providerAccountId"),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	token_type: text("token_type"),
	scope: text("scope"),
	sessionState: text("session_state"),
	oauthToken_secret: text("oauth_token_secret"),
	oauthToken: text("oauth_token"),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const sessions = pgTable("sessions", {
	id: serial("id").primaryKey(),
	sessionToken: text("sessionToken"),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const tokens = pgTable("tokens", {
	id: serial("id").primaryKey(),
	identifier: text("identifier"),
	token: text("token").unique(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

export type InsertToken = typeof tokens.$inferInsert;
export type SelectToken = typeof tokens.$inferSelect;
