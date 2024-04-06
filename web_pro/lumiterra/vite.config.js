import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
function pathResolve(dir) {
	return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [
				AntDesignVueResolver({
					importStyle: false, // css in js
				}),
			],
		}),
	],
	resolve: {
		alias: [
			// /@/xxxx => src/xxxx
			{
				find: /\/@\//,
				replacement: pathResolve("src") + "/",
			},
			// /#/xxxx => types/xxxx
			{
				find: /\/#\//,
				replacement: pathResolve("types") + "/",
			},
			{
				find: /@\//,
				replacement: pathResolve("src") + "/",
			},
			// /#/xxxx => types/xxxx
			{
				find: /#\//,
				replacement: pathResolve("types") + "/",
			},
		],
	},
	//根据当前运行环境设置 base值
	base: process.env.NODE_ENV === "production" ? "/Static/lumi/" : "/",
	server: {
		proxy: {
			"/api": {
				target: "https://thlm.bond/",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
