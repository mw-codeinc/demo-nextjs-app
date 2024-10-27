import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Page() {
	return (
		<>
			<LoginLink>Sign in</LoginLink>
			<RegisterLink>Sign up</RegisterLink>
		</>
	);
}
