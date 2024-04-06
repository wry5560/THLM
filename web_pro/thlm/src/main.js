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
} from "ant-design-vue";
const app = createApp(App);

app.use(Button);
app.use(Divider);
app.use(Typography);
app.use(Result);
app.use(Spin);
app.use(Modal);
app.use(Tooltip);
createApp(App).mount("#app");
