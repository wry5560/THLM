// const Redis = require('ioredis')
import {logger} from './log4js.mjs'
import {WebSocketServer} from 'ws'
import  url from 'url'
import moment  from 'dayjs'
import {getLumiBoxInfo,getLumiDefiInfo,getLumiMarketProduct,getLumiMarketTvl,getLumiPoolInfo,getLumiTotemInfo,getLumiTotemNftInfo} from './api/lumiApi.mjs'
const wsServer = new WebSocketServer({port:9999})
let LumiMarketTvlData = {}
let LumiMarketProductData = []
let LumiBoxNftsData = {}
let LumiDefiData = {}
let LumiTotemInfosData = {}
let LumiPoolInfosData = {}
let LumiTotemNftData = []


process.on('warning',e=>logger.warn(e.stack))
process.setMaxListeners(0)


const clients = new Map()
const Lumi_Market_Tvl_SubClients = new Map()
const Lumi_Market_Product_SubClients = new Map()
const Lumi_Box_Nfts_SubClients = new Map()
const Lumi_Defi_SubClients = new Map()
const Lumi_Totem_Infos_SubClients = new Map()
const Lumi_Pool_Infos_SubClients = new Map()
const Lumi_Totem_Nft_SubClients = new Map()

//创建连接
wsServer.on("connection",(ws,req) =>{
    const {query} = url.parse(req.url,true)
    const {userId} = query
    if(!userId){
        ws.send('no userId')
        ws.terminate()
        logger.info("没有找到userId，关闭连接!")
        return
    }
    const clientId = userId + '-' + moment().valueOf()
    logger.info(clientId + "客户端已连接:")
    clients.set(clientId,ws)
    //ping pong机制，30S无反应则断开连接
    let pingTime = 0
    let isAlive = true
    const pingInterval = setInterval(()=>{
        if(pingTime >=6 && !isAlive){
            ws.terminate()
            deleteClient(clientId)
            clearInterval(pingInterval)
        }else{zq
            isAlive = false
            ws.ping()
        }
    },5000)
    ws.on('pong',()=>{
        isAlive = true
        pingTime = 0
    })
    //接受到client 数据时
    ws.on("message",d=>{
        if(d.toString() ==='ping'){
            ws.send('pong')
        }else{
            try {
                const data = eval("("+d+")")
                switch (data.action){
                    case 'sub':
                        subChannel(data.args,ws,clientId)
                        break
                    case 'unSub':
                        unSubChannel(data.args,ws,clientId)
                        break
                }
            } catch (error) {
                logger.error(error)
            }
        }
    })
    ws.on("close",()=>{
        logger.info("websocket server:客户端已关闭连接")
        deleteClient(clientId)
    })
    ws.onerror = function (e) {
        logger.info("websocket server:出错了")
        logger.error(e)
    }
})

loadData()
setInterval(()=>{
    try{
        loadLumiBoxInfoData()
        loadLumiTotemInfoData()
        loadLumiPoolInfoData()
        loadLumiDefiData()
        loadLumiMarketTvlData()
        loadLumiMarketProductData()
        loadLumiTotemNftData()
    }catch (e){}


},60000)

logger.info("websocket 服务已运行在端口9999")
function loadData(){
    try{
        loadLumiBoxInfoData()
        loadLumiTotemInfoData()
        loadLumiPoolInfoData()
        loadLumiDefiData()
        loadLumiMarketTvlData()
        loadLumiMarketProductData()
        loadLumiTotemNftData()
        loadLumiTotemNftData()
    }catch (e){}
}

function subChannel(args,ws,usdrId){
    if(typeof args !== 'object' || !args.length) return ws.send(createReturnRes('error','参数格式错误',args))
    args.forEach(item=>{
        if(!item.channel) return ws.send(createReturnRes('error','缺少channel参数',item))
        const args = item.args || []
        let ticks = []
        switch (item.channel){
            case 'Lumi_Market_Tvl':
                let Lumi_Market_Tvl_Options = {}
                if(args && args.length > 0){}
                Lumi_Market_Tvl_SubClients.set(usdrId,Lumi_Market_Tvl_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Market_Tvl','snapshot',LumiMarketTvlData))
                break
            case 'Lumi_Market_Product':
                let Lumi_Market_Product_Options = {}
                if(args && args.length > 0){}
                Lumi_Market_Product_SubClients.set(usdrId,Lumi_Market_Product_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Market_Product','snapshot',LumiMarketProductData))
                break
            case 'Lumi_Box_Nfts':
                let Lumi_Box_Nfts_Options = {}
                if(args && args.length > 0){}
                Lumi_Box_Nfts_SubClients.set(usdrId,Lumi_Box_Nfts_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Box_Nfts','snapshot',LumiBoxNftsData))
                break
            case 'Lumi_Defi':
                let Lumi_Defi_Options = {}
                if(args && args.length > 0){}
                Lumi_Defi_SubClients.set(usdrId,Lumi_Defi_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Defi','snapshot',LumiDefiData))
                break
            case 'Lumi_Totem_Infos':
                let Lumi_Totem_Infos_Options = {}
                if(args && args.length > 0){}
                Lumi_Totem_Infos_SubClients.set(usdrId,Lumi_Totem_Infos_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Totem_Infos','snapshot',LumiTotemInfosData))
                break
            case 'Lumi_Pool_Infos':
                let Lumi_Pool_Infos_Options = {}
                if(args && args.length > 0){}
                Lumi_Pool_Infos_SubClients.set(usdrId,Lumi_Pool_Infos_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Pool_Infos','snapshot',LumiPoolInfosData))
                break
            case 'Lumi_Totem_Nft':
                let Lumi_Totem_Nft_Options = {}
                if(args && args.length > 0){}
                Lumi_Totem_Nft_SubClients.set(usdrId,Lumi_Totem_Nft_Options)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                ws.send(createReturnRes('Lumi_Totem_Nft','snapshot',LumiTotemNftData))
                break
            default:
                ws.send(createReturnRes('error','未知的频道',item.channel))
        }
    })
}
function unSubChannel(args,ws,usdrId){
    if(typeof args !== 'object' || !args.length) return ws.send(createReturnRes('error','参数格式错误',args))
    args.forEach(item=>{
        if(!item.channel) return ws.send(createReturnRes('error','缺少channel参数',item))
        const args = item.args || []
        switch (item.channel){
            case 'Lumi_Market_Tvl':
                Lumi_Market_Tvl_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Market_Product':
                Lumi_Market_Product_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Box_Nfts':
                Lumi_Box_Nfts_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Defi':
                Lumi_Defi_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Totem_Infos':
                Lumi_Totem_Infos_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Pool_Infos':
                Lumi_Pool_Infos_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'Lumi_Totem_Nft':
                Lumi_Totem_Nft_SubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
            default:
                ws.send(createReturnRes('error','未知的频道',item.channel))
        }
    })
}
function deleteClient(clientId){
    clients.delete(clientId)
    Lumi_Market_Tvl_SubClients.delete(clientId)
    Lumi_Market_Product_SubClients.delete(clientId)
    Lumi_Box_Nfts_SubClients.delete(clientId)
    Lumi_Defi_SubClients.delete(clientId)
    Lumi_Totem_Infos_SubClients.delete(clientId)
    Lumi_Pool_Infos_SubClients.delete(clientId)
}

function createReturnRes(event,message,data){
    return JSON.stringify({
        event,
        message,
        data,
        eventTime:moment().valueOf()
    })
}
function parseMsg(message){
    return eval("("+message+")")
}

function loadLumiBoxInfoData(){
    // {action:"sub",args:[{channel:"Lumi_Box_Nfts"}]}
    getLumiBoxInfo().then(res=>{
        if(res.state==='success'){
            let needSendData = false
            res.data.forEach(item=>{
                if(!LumiBoxNftsData[item.nft_type] || LumiBoxNftsData[item.nft_type].update != item.update){
                    LumiBoxNftsData[item.nft_type] = item
                    needSendData = true
                }
            })
            if(needSendData){
                Lumi_Box_Nfts_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Box_Nfts','update',LumiBoxNftsData))
                })
            }
        }
    })
}
function loadLumiTotemInfoData(){
    // {action:"sub",args:[{channel:"Lumi_Totem_Infos"}]}
    getLumiTotemInfo().then(res=>{ 
        if(res.state==='success'){
            let needSendData = false
            res.data.forEach(item=>{
                if(!LumiTotemInfosData[item.nft_type] || LumiTotemInfosData[item.nft_type].update != item.update){
                    LumiTotemInfosData[item.nft_type] = item
                    needSendData = true
                }
            })
            if(needSendData){
                Lumi_Totem_Infos_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Totem_Infos','update',LumiTotemInfosData))
                })
            }
        }
    })
}
function loadLumiPoolInfoData(){
    // {action:"sub",args:[{channel:"Lumi_Pool_Infos"}]}
    getLumiPoolInfo().then(res=>{
        if(res.state==='success'){
            let needSendData = false
            res.data.forEach(item=>{
                if(!LumiPoolInfosData[item.pair] || LumiPoolInfosData[item.pair].update != item.update){
                    LumiPoolInfosData[item.pair] = item
                    needSendData = true
                }
            })
            if(needSendData){
                Lumi_Pool_Infos_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Pool_Infos','update',LumiPoolInfosData))
                })
            }
        }
    })
}
function loadLumiDefiData(){
    // {action:"sub",args:[{channel:"Lumi_Defi"}]}
    getLumiDefiInfo().then(res=>{
        // console.log(res)
        if(res.state==='success'){
            if(LumiDefiData.update != res.data.update){
                LumiDefiData = res.data
                Lumi_Defi_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Defi','update',LumiDefiData))
                })
            }

        }
    })
}
function loadLumiMarketTvlData(){
    // {action:"sub",args:[{channel:"Lumi_Market_Tvl"}]}
    getLumiMarketTvl().then(res=>{
        // console.log(res)
        if(res.state==='success'){
            if(LumiMarketTvlData.update != res.data.update){
                LumiMarketTvlData = res.data
                Lumi_Market_Tvl_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Market_Tvl','update',LumiMarketTvlData))
                })
            }
        }
    })
}
function loadLumiTotemNftData(){
    // {action:"sub",args:[{channel:"Lumi_Market_Tvl"}]}
    getLumiTotemNftInfo().then(res=>{
        // console.log(res)
        if(LumiTotemNftData.length===0 || LumiTotemNftData[0].update != res.data[0].update){
                LumiTotemNftData = res.data
                Lumi_Totem_Nft_SubClients.forEach((v,k)=>{
                    clients.get(k).send(createReturnRes('Lumi_Totem_Nft','update',LumiTotemNftData))
                })
            }
        })
}
function loadLumiMarketProductData(){
    // {action:"sub",args:[{channel:"Lumi_Market_Product"}]}
    getLumiMarketProduct().then(res=>{
        // console.log(res)
        let needSendData = false
        let updateData = []
        if(res.state==='success'){
            res.data.forEach(item=>{
                const index  = LumiMarketProductData.findIndex(v=>v.id === item.id)
                if(index === -1){
                    LumiMarketProductData.push(item)
                    updateData.push(item)
                    needSendData = true
                }else if(LumiMarketProductData[index].update != item.update){
                    needSendData = true
                    if(item.stock !=LumiMarketProductData[index].stock || item.token_price != LumiMarketProductData[index].token_price || item.volume_24h != LumiMarketProductData[index].volume_24h){
                        updateData.push(item)
                    }
                    LumiMarketProductData[index] = item
                }
            })
        }
        if(needSendData){
            updateData.push({id:'0xxxxxxxxxxxxxxxxxxxxxxxxxxx',update:res.data[0].update})
            Lumi_Market_Product_SubClients.forEach((v,k)=>{
                clients.get(k).send(createReturnRes('Lumi_Market_Product','update',updateData))
            })
        }
    })
}
