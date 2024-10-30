import { accounts, db, users } from "@/db/schema";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
	}),
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
					redirect_uri: process.env.GOOGLE_REDIRECT_URI,
					scope:
						"https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/webmasters",
				},
			},
		}),
	],
});
