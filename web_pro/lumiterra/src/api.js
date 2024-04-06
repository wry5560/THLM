import { axios } from "./request";

export function getLumiMarketTvl() {
	return getAction("/lumi/market_tvl");
}
export function getLumiMarketProduct() {
	return getAction("/lumi/market_product");
}
export function getLumiBoxInfo() {
	return getAction("/lumi/box_nfts");
}
export function getLumiDefiInfo() {
	return getAction("/lumi/defi");
}
export function getLumiTotemInfo() {
	return getAction("/lumi/totem_infos");
}

function getAction(url, parameter) {
	return axios({
		url: url,
		method: "GET",
		params: parameter,
	});
}
function postAction(url, parameter) {
	return axios({
		url: url,
		method: "POST",
		data: parameter,
	});
}
