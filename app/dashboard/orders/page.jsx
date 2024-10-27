import { PATHS } from "@/components/application-layout";
import { Avatar } from "@/components/tailwindui/avatar";
import { Button } from "@/components/tailwindui/button";
import { Heading } from "@/components/tailwindui/heading";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/tailwindui/table";
import { getOrders } from "@/lib/data";

export const metadata = {
	title: "Orders",
};

export default async function Orders() {
	let orders = await getOrders();

	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Orders</Heading>
				<Button className="-my-0.5">Create order</Button>
			</div>
			<Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
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
						<TableRow
							key={order.id}
							href={PATHS.ORDERS + "/" + order.id}
							title={`Order #${order.id}`}
						>
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
