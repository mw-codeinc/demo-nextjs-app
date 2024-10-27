/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [{ hostname: "*.blob.vercel-storage.com" }],
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		esmExternals: true,
		mdxRs: true,
		scrollRestoration: true,
		after: true,
		reactCompiler: true,
	},
	webpack: (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				extensionAlias: {
					".js": [".js", ".ts"],
					".jsx": [".jsx", ".tsx"],
				},
			},
		};
	}
};

export default nextConfig