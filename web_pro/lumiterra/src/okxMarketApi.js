import axios from 'axios'
import cryptoJs from 'crypto-js'
import Web3 from 'web3'
const apiBaseUrl = 'https://www.okx.com/'
const okxApiKey = '8b4f05a5-d190-43db-b44c-c5fb950c37fc'
const secretKey = '8D3B5E96D3EF826A5C7D358232F6786A'
const passphrase = 'Thlm@123456'
const projectId = 'b90360056002847b1885b327c93cdf3b'

function getAction(url, parameter) {
    const timestamp = new Date().toISOString()
	return axios({
		url: apiBaseUrl + url,
		method: "GET",
		params: parameter,
        headers: {
            'Content-Type': 'application/json',
            'OK-ACCESS-KEY': okxApiKey,
            'OK-ACCESS-SIGN': cryptoJs.enc.Base64.stringify(
                cryptoJs.HmacSHA256(timestamp + 'GET' + url, secretKey)
            ),
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': passphrase,
            'OK-ACCESS-PROJECT': projectId
        }
	});
}



