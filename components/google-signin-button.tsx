import { signIn } from "@/lib/auth";

export function GoogleSignInButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google", { redirectTo: "/dashboard" });
			}}
		>
			<button type="submit">Google Auth Sign in</button>
		</form>
	);
}
