import { db } from "@/db";
import { users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user == null || !user.id) throw new Error("Auth error" + user);

	const dbUser = await db.select().from(users).where(eq(users.authId, user.id));

	if (!dbUser || (dbUser && dbUser.length === 0)) {
		await db.insert(users).values({
			authId: user.id,
			authSource: "kinde",
			firstName: user.given_name,
			lastName: user.family_name,
			email: user.email,
			username: user.username,
			phoneNumber: user.phone_number,
			image: user.picture,
		});
	}

	return NextResponse.redirect("http://localhost:3000/dashboard");
}
