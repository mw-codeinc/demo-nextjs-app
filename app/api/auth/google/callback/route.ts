import { db } from "@/db";
import { integrations, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const reqUrl = new URL(req.url);
		const code = reqUrl.searchParams.get("code");

		if (!code) {
			return NextResponse.json({ error: "Authorization code is missing." }, { status: 400 });
		}

		const url =
			"https://oauth2.googleapis.com/token?" +
			new URLSearchParams({
				code: code,
				client_id: process.env.GOOGLE_CLIENT_ID!,
				client_secret: process.env.GOOGLE_CLIENT_SECRET!,
				redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
				grant_type: "authorization_code",
			});

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const { access_token, refresh_token, expires_in, scope, token_type } = await response.json();

		if (!response.ok) {
			throw access_token;
		}

		const dbIntegration = await db
			.select()
			.from(integrations)
			.where(eq(integrations.accessToken, access_token));

		if (!dbIntegration || (dbIntegration && dbIntegration.length === 0)) {
			const { getUser } = getKindeServerSession();
			const _user = await getUser();
			const dbUser = await db.select().from(users).where(eq(users.authId, _user.id));
			const user = dbUser[0];

			const oauth2Client = new google.auth.OAuth2(
				process.env.GOOGLE_CLIENT_ID,
				process.env.GOOGLE_CLIENT_SECRET,
			);

			oauth2Client.setCredentials({
				access_token: access_token,
				refresh_token: refresh_token,
			});

			const _people = google.people({ version: "v1", auth: oauth2Client });
			const people = await _people.people.get({
				resourceName: "people/me",
				personFields: "emailAddresses,names,photos",
			});

			const { emailAddresses } = people.data;

			const dbIntegrationsUser = await db
				.select()
				.from(integrations)
				.where(and(eq(integrations.userId, user.id), eq(integrations.provider, "google")));

			if (!dbIntegrationsUser || (dbIntegrationsUser && dbIntegrationsUser.length === 0)) {
				await db.insert(integrations).values({
					userId: user.id,
					username: emailAddresses![0]["value"],
					provider: "google",
					accessToken: access_token,
					refreshToken: refresh_token,
					expiresAt: expires_in,
					scope: scope,
					tokenType: token_type,
				});
			} else {
				await db
					.update(integrations)
					.set({
						username: emailAddresses![0]["value"],
						accessToken: access_token,
						refreshToken: refresh_token,
						expiresAt: expires_in,
						scope: scope,
						tokenType: token_type,
					})
					.where(and(eq(integrations.userId, user.id), eq(integrations.provider, "google")));
			}
		}
		return NextResponse.redirect("http://localhost:3000/dashboard");
	} catch (error) {
		console.log(error);

		const errorResponse = {
			error: "RefreshAccessTokenError",
		};

		return NextResponse.json(errorResponse, { status: 500 });
	}
}
