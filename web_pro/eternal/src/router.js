import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from "vue-router";

const routes = [
	// 在这里定义您的路由
	{
		path: "/",
		name: "home",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/Home.vue"),
	},
	{
		path: "/earn",
		name: "earn",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/Earn.vue"),
	},
	{
		path: "/invite",
		name: "invite",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/Invite.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: () =>
			import(/* webpackChunkName: "about" */ "./views/404.vue"),
	},
];

export const router = createRouter({
	history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
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
