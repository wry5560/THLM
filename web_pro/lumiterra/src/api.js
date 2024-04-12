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
export function getLumiPortInfo() {
	return getAction("/lumi/pool_infos");
}
export function getLumiTotemNftInfo() {
	return getAction("/lumi/totem_nfts");
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
