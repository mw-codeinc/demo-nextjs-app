// @ts-nocheck

import { Avatar } from "@/components/tailwindui/avatar";
import { Badge } from "@/components/tailwindui/badge";
import { Divider } from "@/components/tailwindui/divider";
import { Heading, Subheading } from "@/components/tailwindui/heading";
import { Select } from "@/components/tailwindui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/tailwindui/table";
import { getEvents, getRecentOrders } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export function SignInWithGoogle() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const redirectUri = process.env.GOOGLE_REDIRECT_URI;

	const scopes = [
		// Google Analytics Scopes
		"https://www.googleapis.com/auth/analytics",

		// Google Search Console Scopes
		"https://www.googleapis.com/auth/webmasters",
	];

	const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(
		clientId,
	)}&redirect_uri=${encodeURIComponent(
		redirectUri,
	)}&scope=${encodeURIComponent(scopes.join(" "))}&access_type=offline&prompt=consent`;

	return (
		<div>
			<a href={oauthUrl}>Sign in with Google</a>
		</div>
	);
}

export function Stat({ title, value, change }) {
	return (
		<div>
			<Divider />
			<div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
			<div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
			<div className="mt-3 text-sm/6 sm:text-xs/6">
				<Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>{" "}
				<span className="text-zinc-500">from last week</span>
			</div>
		</div>
	);
}

// async function getApiResponse(): Promise<any> {
// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
// 	return await res.json();
// }

export default async function Home() {
	let orders = await getRecentOrders();
	let events = await getEvents();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	// const apiResponse = await getApiResponse();

	return (
		<>
			<Heading>Good afternoon, {user.given_name}</Heading>
			<div className="mt-8 flex items-end justify-between">
				<Subheading>Overview</Subheading>
				<div>
					<Select name="period">
						<option value="last_week">Last week</option>
						<option value="last_two">Last two weeks</option>
						<option value="last_month">Last month</option>
						<option value="last_quarter">Last quarter</option>
					</Select>
				</div>
			</div>
			<div>
				<SignInWithGoogle />
			</div>
			<div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				<Stat title="Total revenue" value="$2.6M" change="+4.5%" />
				<Stat title="Average order value" value="$455" change="-0.5%" />
				<Stat title="Tickets sold" value="5,888" change="+4.5%" />
				<Stat title="Pageviews" value="823,067" change="+21.2%" />
			</div>
			<Subheading className="mt-14">Recent orders</Subheading>
			<Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
				<TableHead>
					<TableRow>
						<TableHeader>Order number</TableHeader>
						<TableHeader>Purchase date</TableHeader>
						<TableHeader>Customer</TableHeader>
						<TableHeader>Event</TableHeader>
						<TableHeader className="text-right">Amount</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
							<TableCell>{order.id}</TableCell>
							<TableCell className="text-zinc-500">{order.date}</TableCell>
							<TableCell>{order.customer.name}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar src={order.event.thumbUrl} className="size-6" />
									<span>{order.event.name}</span>
								</div>
							</TableCell>
							<TableCell className="text-right">US{order.amount.usd}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
