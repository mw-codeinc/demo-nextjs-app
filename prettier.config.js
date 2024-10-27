export default {
	semi: true,
	singleQuote: false,
	trailingComma: "all",
	printWidth: 100,
	useTabs: true,
	tabWidth: 2,
	plugins: [
		"prettier-plugin-packagejson",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss",
	],
	tailwindConfig: "./tailwind.config.ts",
};
