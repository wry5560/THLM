const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
// const csvFilePath1 = './files/精英轮白名单001-01-必中幸运白.CSV';
const csvFilePath1 = './files/精英轮白名单001-01-test111 copy.CSV';

const url = 'https://thlm.bond/eternal/premint'

axios.get(url)
    .then((response) => {
        const res = response.data
        if(res.state === 'success') {
            const data = res.data
            
            let sum = 0
            let addresses = []
            let threeNum = 0
            let sixNum = 0
            data.jingying.forEach((item) => {
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
            console.log("当前Mint总数为："+sum+",共有"+addresses.length+"个地址")
            console.log(data.jingying[0])
            let dataArray = []
            fs.createReadStream(csvFilePath1,'utf-8')
            .pipe(csv({ headers: false}))
            .on('data', (data) => {
                
                const index = dataArray.findIndex((i) => i[0].toUpperCase() == data[0].toUpperCase())
                if(index !== -1) {
                    // console.log('重复地址：'+data[0]);
                    dataArray[index][1] = Number(dataArray[index][1]) + Number(data[1])
                } else if(data[1] !='0') {
                    dataArray.push(data)
                }
            })
            .on('end', async () => {
                let sum = 0
                let threeSum = 0
                let sixSum = 0
                const kolData = {}
                // console.log(dataArray[0])
                dataArray.forEach((item,index) => {
                    sum += Number(item[1])
                    if(item[2] == '3') threeSum += Number(item[1])
                    if(item[2] == '6') sixSum += Number(item[1])
                    const index2 = addresses.findIndex((i) => i.address.toLowerCase() === item[0].toLowerCase())
                    const mintNum = index2>-1 ?  addresses[index2].amount : 0

                    if(kolData[item[3]]) {
                        kolData[item[3]].addresses.push({
                            address: item[0],
                            amount: Number(item[1]),
                            mintNum:mintNum,
                            month: item[2],
                            kolName: item[3],
                            addressName: item[4]
                        })
                        kolData[item[3]].total += Number(item[1])
                        kolData[item[3]].mintNum += mintNum
                    } else {
                        kolData[item[3]] ={
                            total: Number(item[1]),
                            addresses: [{
                                address: item[0],
                                amount: Number(item[1]),
                                mintNum:mintNum,
                                month: item[2],
                                kolName: item[3],
                                addressName: item[4]
                            }],
                            mintNum,
                            name: item[3]
                        }
                    }
                })
                let totalMintNum = 0
                const consoleData = []
                Object.values(kolData).forEach((item,index) => {
                    totalMintNum += item.mintNum
                    item.addresses.forEach((abc) => {
                        if(abc.mintNum < abc.amount) {
                                kolName: item[3],
                            console.log(abc.address + ':来自'+abc.kolName + abc.addressName +',Mint数量为'+abc.mintNum+',未mint数量为'+ (abc.amount - abc.mintNum) )
                        }
                    })
                    consoleData.push(item.name + '的总数为：'+item.total+', mint数量为：'+item.mintNum)
                })
                console.log(consoleData)
                console.log("当前Mint总数为："+totalMintNum)
                // console.log(kolData)
                console.log("白名单共有" + dataArray.length + '个地址,' + '总数为：'+sum +', 其中3个月的数量为：'+threeSum+', 6个月的数量为：'+sixSum);
            })

        }
    })
