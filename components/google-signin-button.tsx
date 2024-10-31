export function GoogleSignInButton() {
	const clientId = process.env.GOOGLE_CLIENT_ID!;
	const redirectUri = process.env.GOOGLE_REDIRECT_URI!;

	const scopes = [
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/analytics",
		"https://www.googleapis.com/auth/webmasters",
	];

	const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(
		clientId,
	)}&redirect_uri=${encodeURIComponent(
		redirectUri,
	)}&scope=${encodeURIComponent(scopes.join(" "))}&access_type=offline&prompt=consent`;

	return (
		<div>
			<a href={oauthUrl}>Link Google account</a>
		</div>
	);
}
