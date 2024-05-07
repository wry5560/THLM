const fs = require('fs');
const csv = require('csv-parser');
const Web3 = require('web3');
const axios = require('axios');
const url = 'https://thlm.bond/eternal/premint'

const csvFilePath = './files/精英轮白名单001-01-test111.CSV';
let dataArray = [];
async function getEternalData() {
    const response = await axios.get(url)
        const res = response.data
        let addresses = []
        if(res.state === 'success') {
            const data = res.data
            
            let sum = 0

            data.forEach((item) => {
                sum += Number(item.other.number)
                const index = addresses.findIndex((i) => i.address === item.send)
                if(index === -1) {
                    addresses.push({
                        address: item.send,
                        amount: Number(item.other.number)
                    })
                } else {
                    addresses[index].amount += Number(item.other.number)
                }
            })
            console.log(sum)
            // console.log(addresses.length)
            // console.log(addresses)
        }
        return addresses
}
    fs.createReadStream(csvFilePath,'utf-8')
    .pipe(csv({ headers: false }))
    .on('data', (data) => {
        dataArray.push(data);
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
        const addresses = await getEternalData()

        let sum = 0
        let leftSum = 0
        let leftAddresses = []
        dataArray.forEach((item,index) => {
        //验证 item[0] 是否是以太坊地址
        if (!Web3.utils.isAddress(item[0])) {
            console.log(`${item[0]} is not a valid Ethereum address.`);
            console.log(index);
        }
            sum += Number(item[1])

            const index2 =addresses.findIndex((i) => i.address.toLowerCase() === item[0].toLowerCase())
            if(index2 === -1) {
                leftAddresses.push({
                    address: item[0],
                    amount: Number(item[1]),
                    name:item[3]
                })
                leftSum += Number(item[1])
            }
            // else if(addresses[index2].amount < Number(item[1])){
            //     item[1] -= addresses[index2].amount
            //     const index3 = leftAddresses.findIndex((i) => i.address.toLowerCase() === item[0].toLowerCase())
            //     if(index3 === -1) {
            //         leftAddresses.push({
            //             address: item[0],
            //             amount: Number(item[1]),
            //             name:item[3]
            //         })}else{
            //             leftAddresses[index3].amount = Number(item[1])
            //         }
            //     leftSum += Number(item[1])
            // }
        })
        const leftPeople = {}
        leftAddresses.forEach((item) => {
            if(leftPeople[item.name]){
                leftPeople[item.name].addresses.push(item)
                leftPeople[item.name].sum += item.amount
            }else{
                leftPeople[item.name] = {
                    addresses:[item],
                    sum:item.amount
                }
            }
        })
        console.log(sum);
        console.log(leftSum);
        console.log(leftPeople);
        console.log(leftPeople.lengfeng.addresses);
        console.log('CSV file parsing completed.');
    });
