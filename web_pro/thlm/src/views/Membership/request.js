import axios from "axios";
import { apiUrl } from "./config";

// 创建 axios 实例
const service = axios.create({
	baseURL:apiUrl,
	timeout: 60000, // 请求超时时间
});

service.defaults.withCredentials = true;
service.defaults.retry = 1;
service.defaults.retryDelay = 2000;

const err = (error) => {
	if (error.response) {
		// 发送请求后，服务端返回的响应码不是 2xx
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// 发送请求但是没有响应返回
		// 发送请求但是没有响应返回
		var config = err.config;
		// If config does not exist or the retry option is not set, reject
		if (!config || !config.retry) {
			console.log("timeout");
			return Promise.reject(err);
		}

		// Set the variable for keeping track of the retry count
		config.__retryCount = config.__retryCount || 0;

		// Check if we've maxed out the total number of retries
		if (config.__retryCount >= config.retry) {
			// Reject with the error
			console.log("timeout");
			return Promise.reject(err);
		}

		// Increase the retry count
		config.__retryCount += 1;

		// Create new promise to handle exponential backoff
		var backoff = new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function () {
			console.log("timeout! retry...", config);
			console.log("config.__retryCount", config.__retryCount);
			// console.log('timeout! retry...')
			return service(config);
		});
		// console.log('timeout')
		// console.log(error.request);
	} else {
		// 其他错误
		console.log("Error", error.message);
	}
	console.log(error.config);
};

// request interceptor
service.interceptors.request.use((config) => {
	// if (token) {
	//     config.headers[ 'Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
	// }
	// debugger
	config = {
		...config,
		retry: 5,
		retryDelay: 1000,
	};
	// console.log(config)
	return config;
}, err);

// response interceptor
service.interceptors.response.use((response) => {
	// console.log('interceptors.response!')
	// debugger
	// if (response.data.error && response.data.error === "login error") {
	// console.log("login error");
	// window.location =
	// 	(isTest ? "http://localhost:8080/#/" : "http://8.210.59.221/#/") +
	// 	"login";
	// window.location.reload();
	// setTimeout(() => {
	//   window.location.reload()
	//   ,1000
	// })
	// return;
	// }
	return response.data;
}, err);

export { service as axios };
