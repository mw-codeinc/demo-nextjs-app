"use client";

import { Avatar } from "@/components/tailwindui/avatar";
import {
	Dropdown,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from "@/components/tailwindui/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/tailwindui/navbar";
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
	SidebarSpacer,
} from "@/components/tailwindui/sidebar";
import { SidebarLayout } from "@/components/tailwindui/sidebar-layout";
import { getEvents } from "@/lib/data";
import {
	ArrowRightStartOnRectangleIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	Cog8ToothIcon,
	PlusIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
	BeakerIcon,
	Cog6ToothIcon,
	HomeIcon,
	QuestionMarkCircleIcon,
	SparklesIcon,
	Square2StackIcon,
	TicketIcon,
} from "@heroicons/react/20/solid";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";

const DASHBOARD = "/dashboard";
export const PATHS = {
	DASHBOARD,
	EVENTS: DASHBOARD + "/events",
	ORDERS: DASHBOARD + "/orders",
	ADD_USER: DASHBOARD + "/users/new",
	SETTINGS: DASHBOARD + "/settings",
	CAMPAIGNS: DASHBOARD + "/campaigns",
};

function AccountDropdownMenu({ anchor }: { anchor: "top start" | "bottom end" }) {
	return (
		<DropdownMenu className="min-w-64" anchor={anchor}>
			<DropdownItem href="#">
				<UserCircleIcon />
				<DropdownLabel>My account</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="#">
				<ShieldCheckIcon />
				<DropdownLabel>Privacy policy</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem>
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel>
					<LogoutLink>Sign out</LogoutLink>
				</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	);
}

export function ApplicationLayout({
	events,
	children,
	user,
}: {
	events: Awaited<ReturnType<typeof getEvents>>;
	children: React.ReactNode;
	user: any;
}) {
	let pathname = usePathname();

	return (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar src={user["picture"]} square />
							</DropdownButton>
							<AccountDropdownMenu anchor="bottom end" />
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<Avatar src="/teams/catalyst.svg" />
								<SidebarLabel>Catalyst</SidebarLabel>
								<ChevronDownIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="#">
									<PlusIcon />
									<DropdownLabel>New team&hellip;</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SidebarHeader>

					<SidebarBody>
						<SidebarSection>
							<SidebarItem href={PATHS.DASHBOARD} current={pathname === PATHS.DASHBOARD}>
								<HomeIcon />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.CAMPAIGNS} current={pathname.startsWith(PATHS.CAMPAIGNS)}>
								<BeakerIcon />
								<SidebarLabel>Campaigns</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.EVENTS} current={pathname.startsWith(PATHS.EVENTS)}>
								<Square2StackIcon />
								<SidebarLabel>Keyword Research</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.EVENTS} current={pathname.startsWith(PATHS.EVENTS)}>
								<Square2StackIcon />
								<SidebarLabel>Content Strategy</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.EVENTS} current={pathname.startsWith(PATHS.EVENTS)}>
								<UserCircleIcon />
								<SidebarLabel>Personas</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.ORDERS} current={pathname.startsWith(PATHS.ORDERS)}>
								<TicketIcon />
								<SidebarLabel>Orders</SidebarLabel>
							</SidebarItem>
							<SidebarItem href={PATHS.SETTINGS} current={pathname.startsWith(PATHS.SETTINGS)}>
								<Cog6ToothIcon />
								<SidebarLabel>Settings</SidebarLabel>
							</SidebarItem>
						</SidebarSection>

						<SidebarSection className="max-lg:hidden">
							<SidebarHeading>Upcoming Events</SidebarHeading>
							{events.map((event) => (
								<SidebarItem key={event.id} href={event.url}>
									{event.name}
								</SidebarItem>
							))}
						</SidebarSection>

						<SidebarSpacer />

						<SidebarSection>
							<SidebarItem href="#">
								<QuestionMarkCircleIcon />
								<SidebarLabel>Support</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="#">
								<SparklesIcon />
								<SidebarLabel>Changelog</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarBody>

					<SidebarFooter className="max-lg:hidden">
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<span className="flex min-w-0 items-center gap-3">
									<Avatar src={user["picture"]} className="size-10" square alt="" />
									<span className="min-w-0">
										<span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
											{user["given_name"]}
										</span>
										<span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
											{user["email"]}
										</span>
									</span>
								</span>
								<ChevronUpIcon />
							</DropdownButton>
							<AccountDropdownMenu anchor="top start" />
						</Dropdown>
					</SidebarFooter>
				</Sidebar>
			}
		>
			{children}
		</SidebarLayout>
	);
}
