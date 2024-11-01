import "@/app/globals.css";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: {
		template: "%s - Catalyst",
		default: "Catalyst",
	},
	description: "",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
		>
			<body>{children}</body>
		</html>
	);
}
