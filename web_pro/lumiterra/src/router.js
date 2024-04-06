import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from "vue-router";

const routes = [
	// 在这里定义您的路由
	{
		path: "/Static/lumi/",
		name: "default",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/WikiHome.vue"),
	},
	{
		path: "/Static/lumi/WikiHome",
		name: "WikiHome",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/WikiHome.vue"),
	},
	{
		path: "/Static/lumi/dashboard",
		name: "Dashboard",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/Dashboard.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/404.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes: routes,
	// strict: true,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
			};
		} else if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
});
