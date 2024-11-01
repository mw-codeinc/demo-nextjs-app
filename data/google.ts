import { db } from "@/db";
import { integrations, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import "server-only";

export async function getAccountSummaries(): Promise<any[] | null> {
	const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

	try {
		const { getUser } = getKindeServerSession();
		const _user = await getUser();
		const dbUser = await db.select().from(users).where(eq(users.authId, _user.id));
		const user = dbUser[0];
		const dbIntegration = await db
			.select()
			.from(integrations)
			.where(eq(integrations.userId, user.id));
		const integration = dbIntegration[0];

		const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

		oauth2Client.setCredentials({
			access_token: integration.accessToken,
			refresh_token: integration.refreshToken,
		});

		const analyticsAdmin = google.analyticsadmin({ version: "v1beta", auth: oauth2Client });

		const result = await analyticsAdmin.accountSummaries.list();

		if (!result.data.accountSummaries) {
			console.log("No data found for this site");
			return null;
		}

		return result.data.accountSummaries;
	} catch (error) {
		console.log("Error fetching data from Google Analytics Admin API", error);
		return null;
	}
}

export async function getSearchAnalytics(url: string): Promise<any> {
	const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

	try {
		const { origin, host } = new URL(url);

		if (!host) {
			return NextResponse.json({ error: "Site parameter is required" }, { status: 400 });
		}

		const { getUser } = getKindeServerSession();
		const _user = await getUser();
		const dbUser = await db.select().from(users).where(eq(users.authId, _user.id));
		const user = dbUser[0];
		const dbIntegration = await db
			.select()
			.from(integrations)
			.where(eq(integrations.userId, user.id));
		const integration = dbIntegration[0];

		const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

		oauth2Client.setCredentials({
			access_token: integration.accessToken,
			refresh_token: integration.refreshToken,
		});

		// const webmasters = google.webmasters({ version: "v3", auth: oauth2Client });

		// const result = await webmasters.searchanalytics.query({
		// 	siteUrl: "sc-domain:" + host,
		// 	requestBody: {
		// 		startDate: "2024-01-01",
		// 		endDate: "2024-10-30",
		// 		dimensions: ["query"],
		// 		rowLimit: 10,
		// 	},
		// });

		const searchconsole = google.searchconsole({ version: "v1", auth: oauth2Client });

		const result = await searchconsole.searchanalytics.query({
			siteUrl: "sc-domain:" + host,
			requestBody: {
				startDate: "2024-01-01",
				endDate: "2024-10-30",
				dimensions: ["query"],
				rowLimit: 10,
			},
		});

		if (!result.data.rows || result.data.rows.length === 0) {
			console.log("No data found for this site");
			return null;
		}

		const totalImpressions = result.data.rows.reduce((sum, row) => sum + row.impressions!, 0);
		const totalClicks = result.data.rows.reduce((sum, row) => sum + row.clicks!, 0);
		const averagePosition =
			result.data.rows.reduce((sum, row) => sum + row.position!, 0) / result.data.rows.length;

		console.log("SITES");
		console.log(totalImpressions);

		return {
			siteUrl: origin,
			impressions: totalImpressions,
			clicks: totalClicks,
			position: averagePosition,
		};
	} catch (error) {
		console.log("Error fetching data from Google Search Console API", error);
		return null;
	}
}

export async function getAnalyticsProperties(): Promise<any> {
	const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

	try {
		const { getUser } = getKindeServerSession();
		const _user = await getUser();
		const dbUser = await db.select().from(users).where(eq(users.authId, _user.id));
		const user = dbUser[0];
		const dbIntegration = await db
			.select()
			.from(integrations)
			.where(eq(integrations.userId, user.id));
		const integration = dbIntegration[0];

		const _accountSummaries = await getAccountSummaries();
		// @ts-ignore
		const accountSummaries = _accountSummaries[0].propertySummaries[0];

		const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

		oauth2Client.setCredentials({
			access_token: integration.accessToken,
			refresh_token: integration.refreshToken,
		});

		const analyticsAdmin = google.analyticsadmin({ version: "v1beta", auth: oauth2Client });
		const result = await analyticsAdmin.properties.list({
			filter: `parent:${accountSummaries.parent}`,
		});

		if (!result.data.properties || result.data.properties.length === 0) {
			console.log("No data found for this site");
			return null;
		}

		return result.data.properties;
	} catch (error) {
		console.log("Error fetching data from Google Search Console API", error);
		return null;
	}
}
