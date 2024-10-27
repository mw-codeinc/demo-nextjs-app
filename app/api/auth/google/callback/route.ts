// // app/api/auth/google/callback/route.js

// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(req) {
//   const url = new URL(req.url);
//   const code = url.searchParams.get("code");

//   if (!code) {
//     return NextResponse.json({ error: "Authorization code is missing." }, { status: 400 });
//   }

//   const clientId = process.env.GOOGLE_CLIENT_ID;
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
//   const redirectUri = process.env.GOOGLE_REDIRECT_URI; // Should match the one used in the OAuth URL
//   const tokenEndpoint = 'https://oauth2.googleapis.com/token';



//   try {
//     // Exchange authorization code for tokens
//     // set header application/x-www-form-urlencoded
//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     };

//     const response = await axios.post(tokenEndpoint, null, {
//       params: {
//         code: code,
//         client_id: clientId,
//         client_secret: clientSecret,
//         redirect_uri: redirectUri,
//         grant_type: 'authorization_code',
//       },
//     });

//     const { access_token, refresh_token, scope, expires_in } = response.data;
//     console.log(access_token);
//     //console.log(access_token, refresh_token, scope, expires_in);

//     // Save the token details to the session (You may need to adjust session handling for App Router)
//     // const session = await getSession(req);
//     // session.googleAuth = {
//     //   accessToken: access_token,
//     //   refreshToken: refresh_token,
//     //   scope,
//     //   expiresAt: Date.now() + expires_in * 1000, // Calculate the expiry time
//     // };

//     // Redirect to a success page or home page after saving to session
//     return NextResponse.redirect(new URL('/success', req.url));
//   } catch (error) {
//     console.error("Failed to exchange authorization code for tokens:", error);
//     return NextResponse.json({ error: "An error occurred while processing the authorization." }, { status: 500 });
//   }
// }
