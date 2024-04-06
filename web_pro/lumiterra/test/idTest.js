import { ethers } from "ethers";
import { ids } from "./id.mjs";
import fs from "fs";
const id = ethers.solidityPackedKeccak256(["uint256"], ["28"]);

// console.log(id);
// console.log(ids);

const tmp = [];

for (let i = 0; i < 2000; i++) {
	tmp.push({
		"id-int": i,
		id: ethers.solidityPackedKeccak256(["uint256"], [i]),
	});
}
//将 tmp 写入 ids.json 文件
fs.writeFileSync("./ids.json", JSON.stringify(tmp, null, 2));

console.log(tmp);
