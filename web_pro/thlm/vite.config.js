import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { productUrl} from "./src/views/Membership/config";

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
	//根据当前运行环境设置 base值
	// base: process.env.NODE_ENV === "production" ? "/Static/lumi/thlm" : "/",  	// 持币入群页面测试环境编译
	// base: process.env.NODE_ENV === "production" ? "/thlmholder" : "/",			// 持币入群页面生产环境编译
	// base: process.env.NODE_ENV === "production" ? productUrl : "/",			// 会员中心 & 空投质押 页面生产环境编译
	// base: process.env.NODE_ENV === "production" ? '/Static/membership/gpoints' : "/",			// G分系统
	base: process.env.NODE_ENV === "production" ? '/' : "/",			// G分系统
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
});
