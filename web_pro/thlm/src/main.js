import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import {
	Button,
	Divider,
	Typography,
	Result,
	Spin,
	Modal,
	Tooltip,
	Card,
	Row,
	Col,
	Statistic,
	Menu,
	Empty,
	Badge,
	Tag,
	Radio,
	Table,
} from "ant-design-vue";
const app = createApp(App);

app.use(Button);
app.use(Divider);
app.use(Typography);
app.use(Result);
app.use(Spin);
app.use(Modal);
app.use(Tooltip);
app.use(Card);
app.use(Row);
app.use(Col);
app.use(Statistic);
app.use(Menu);
app.use(Empty);
app.use(Badge);
app.use(Tag);
app.use(Radio);
app.use(Table);
createApp(App).mount("#app");
