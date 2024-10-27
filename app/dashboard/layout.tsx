// @ts-nocheck

import { ApplicationLayout } from "@/components/application-layout";
import { getEvents } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardLayout({ children }) {
	let events = await getEvents();
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<ApplicationLayout user={user} events={events}>
			{children}
		</ApplicationLayout>
	);
}
