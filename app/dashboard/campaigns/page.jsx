import { PATHS } from "@/components/application-layout";
import Tabs from "@/components/tabs";
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
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";

export const metadata = {
	title: "Campaigns",
};

export default async function Orders() {
	let orders = await getOrders();

	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Campaigns</Heading>
				<Button className="-my-0.5">New Campaign</Button>
			</div>
			<Tabs />
			<Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
				<TableHead>
					<TableRow>
						<TableHeader style={{ width: "40%" }}>Campaign Name</TableHeader>
						<TableHeader>Organization</TableHeader>
						<TableHeader>Status</TableHeader>
						<TableHeader>Actions</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.map((order) => (
						<TableRow
							key={order.id}
							href={PATHS.ORDERS + "/" + order.id}
							title={`Order #${order.id}`}
						>
							<TableCell style={{ width: "40%" }}>{order.id}asdasdasd</TableCell>
							<TableCell>{order.customer.name}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar src={order.event.thumbUrl} className="size-6" />
									<span>{order.event.name}</span>
								</div>
							</TableCell>
							<TableCell className="text-right">US{order.amount.usd}</TableCell>

							<TableCell className="text-right">
								<div className="flex items-center space-x-2">
									<PencilSquareIcon className="h-4 w-4" />
									<TrashIcon className="h-4 w-4" />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
