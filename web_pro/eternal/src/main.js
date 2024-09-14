import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createI18n } from "vue-i18n";
import { langs } from "./lang/langs";
import {
	Button,
	Menu,
	Spin,
	Card,
	Image,
	Divider,
	Anchor,
	Flex,
	Typography,
	Segmented,
	Statistic,
	Select,
	Table,
	Pagination,
	Tabs,
	Tooltip,
	Descriptions,
	Empty,
	Alert,
	Radio,
	Tag,
	Input,
} from "ant-design-vue";

const i18n = createI18n({
	legacy: false,
	locale: "en",
	messages: langs,
});

const app = createApp(App);

async function bootstrap() {
	app.use(i18n);
	app.use(router);
	app.use(Button);
	app.use(Menu);
	app.use(Spin);
	app.use(Card);
	app.use(Image);
	app.use(Divider);
	app.use(Anchor);
	app.use(Flex);
	app.use(Typography);
	app.use(Segmented);
	app.use(Statistic);
	app.use(Select);
	app.use(Table);
	app.use(Pagination);
	app.use(Tabs);
	app.use(Tooltip);
	app.use(Descriptions);
	app.use(Empty);
	app.use(Alert);
	app.use(Radio);
	app.use(Tag);
	app.use(Input);
	await router.isReady();
	app.mount("#app");
}

bootstrap();
