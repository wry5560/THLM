const fs = require('fs');
const csv = require('csv-parser');
const Web3 = require('web3');
const csvFilePath1 = './files/精英轮白名单001-01-必中幸运白.CSV';
// const csvFilePath1 = './files/精英轮白名单001-01-必中幸运白.CSV';
// const csvFilePath2 = './files/精英轮白名单001-01 - 幸运白.CSV';
const csvFilePath2 = './files/精英轮白名单001-01 - 增补白.CSV';
let dataArray = [];
let tmpAddresses = []
fs.createReadStream(csvFilePath1,'utf-8')
.pipe(csv({ headers: false}))
.on('data', (data) => {
    const index = dataArray.findIndex((i) => i[0].toUpperCase() == data[0].toUpperCase())
    if(index !== -1) {
        console.log('重复地址：'+data[0]);
        dataArray[index][1] = Number(dataArray[index][1]) + Number(data[1])
    } else if(data[1] !='0') {
        dataArray.push(data)
    }
    // const address = data.ethereum_address;
    // if (ethers.utils.isAddress(address)) {
    //     console.log(`${address} is a valid Ethereum address.`);
    //     // Perform further operations with the valid address
    // } else {
    //     console.log(`${address} is not a valid Ethereum address.`);
    // }
})
.on('end', async () => {
    // console.log(dataArray.length);
    // const addresses = await getEternalData()
        fs.createReadStream(csvFilePath2,'utf-8')
        .pipe(csv({ headers: false}))
        .on('data', (data) => {
            const index = dataArray.findIndex((i) => i[0].toUpperCase() == data[0].toUpperCase())
            if(index !== -1) {
                console.log('重复地址：'+data[0]);
                dataArray[index][1] = Number(dataArray[index][1]) + Number(data[1])
            }
            else {
                dataArray.push(data)
            }
        }).on('end', async () => {
            // console.log(dataArray[0]);
            console.log(dataArray.length);
            let sum = 0
            let threeSum = 0
            let sixNum = 0
            let leftSum = 0
            let leftAddresses = []
            dataArray.forEach((item,index) => {
            //验证 item[0] 是否是以太坊地址
            // if(tmpAddresses.indexOf(item[0]) == -1) tmpAddresses.push(item[0])
            // else {
            //     console.log('重复地址：'+item[0]);
            // }
            if (!Web3.utils.isAddress(item[0])) {
                console.log(`${item[0]} is not a valid Ethereum address.`);
                console.log(index);
            }
            if(item[2] == '3') threeSum += Number(item[1])
            if(item[2] == '6') sixNum += Number(item[1])
                sum += Number(item[1])
            })
            console.log('白单总数为：'+sum +', 其中3个月的数量为：'+threeSum+', 6个月的数量为：'+sixNum);
            // console.log(leftSum);
            // console.log(leftPeople);
            // console.log(leftPeople.lengfeng.addresses);
            console.log('CSV file parsing completed.');
            //将数据写入csv 文件
            const ws = fs.createWriteStream('./files/精英轮白名单001-01-增补白全量.CSV');
            // const ws = fs.createWriteStream('./files/精英轮白名单001-01-必中白.CSV');
            ws.write('Address,Amount,Type\n');
            dataArray.forEach((item) => {
                if(item[1] != '0') ws.write(item[0]+','+item[1]+','+item[2]+'\n');
            })
            ws.end();
        })
});
