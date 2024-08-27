// const Redis = require('ioredis')
const config = require("./config")
const logger = require('./log4js').logger
const WebSocketServer = require('ws')
const url = require('url')
const moment = require('dayjs')
const wsServer = new WebSocketServer.Server({port:9999})
const tickData = new Map()
const fundData = new Map()
const positionData = new Map()
const realVpData = new Map()
const marketStrengthData = new Map()
const futuresMinKlineData = new Map()
const templateMonitorDominantTypeData = {}
const templateMonitorRegularTypeData = {}
const templateMonitorCombinedTypeData = {}
const templateMonitorHedgingTypeData = {}
const templateMonitorSignalTypeData = {}

process.on('warning',e=>logger.warn(e.stack))
process.setMaxListeners(0)


const clients = new Map()
const FuturesMarketTickSubClients = new Map()
const FuturesMinKlineSubClients = new Map()
const AccountUpdateSubClients = new Map()
const AccountPositionSubClients = new Map()
const AccountFundSubClients = new Map()
const ErrorOrderInfoSubClients = new Map()
const AccountActionSubClients = new Map()
const AccountOnlineSubClients = new Map()
const RealVpSubClients = new Map()
const MarketStrengthSubClients = new Map()
const TemplateMonitorSubClients = new Map()
const OrderRankMonitorClients = new Map()

redisClient.on('message',(channel,message)=>{
    // logger.info('redis received channel ' + channel + ' message:' + message)
    const data = parseMsg(message)
    try{
        switch (channel){
            case 'AccountFund':
                fundData.set(data.AccountName,data)
                AccountFundSubClients.forEach((options,clientId)=>{
                    //如果订阅的账户类型为0则为全部订阅，或者没有具体订阅的账号则为全部订阅，或者订阅的账户类型和账号都匹配则推送
                    if(options.AccountType === '0' || options.AccountNames.length === 0
                        || (options.AccountType === data.AccountType && options.AccountNames.includes(data.AccountName))){
                        sendMesToClient({
                            options,
                            clientId,
                            dataToSand:data,
                            channelDataKey:data.AccountName,
                            channelClients:AccountFundSubClients,
                            eventName:'AccountFund',
                            channelData:fundData,
                        })
                    }
                })
                // logger.info('AccountFund:',message)
                break
            case 'AccountPosition':
                // logger.info(data)
                // const accountPositions = positionData.get(data.AccountName) || []
                // const index =accountPositions.findIndex(position=> position.InstrumentID === data.AccountData.InstrumentID && position.Direction === data.AccountData.Direction)
                // index > -1
                //     ? accountPositions[index] = data.AccountData
                //     : accountPositions.push(data.AccountData)
                // positionData.set(data.AccountName,accountPositions)
                AccountPositionSubClients.forEach((options,clientId)=>{
                    if(options.AccountType === '0' || options.AccountNames.length === 0
                        || (options.AccountType ===data.AccountType && options.AccountNames.includes(data.AccountName))){
                        let ws = clients.get(clientId)
                        ws.send(createReturnRes('AccountPosition','new',data))
                        // sendMesToClient({
                        //     options,
                        //     clientId,
                        //     dataToSand:data,
                        //     channelDataKey:data.AccountName,
                        //     channelClients:AccountPositionSubClients,
                        //     eventName:'AccountPosition',
                        //     channelData:positionData,
                        // })
                    }
                })
                // logger.info('AccountPosition:',message)
                break
            case 'AccountUpdate':
                AccountUpdateSubClients.forEach((options,clientId)=>{
                    if(options.AccountType === '0' || options.AccountNames.length === 0
                        || (options.AccountType ===data.AccountType )){
                        const ws = clients.get(clientId)
                        ws.send(createReturnRes('AccountUpdate','new',data))
                    }
                })
                // logger.info('AccountUpdate:',message)
                break
            case 'OrderRankMonitor':
                OrderRankMonitorClients.forEach((options,clientId)=>{
                    if(options.AccountIDs.length === 0
                        || (options.AccountIDs.includes(data.AccountId) )){
                        const ws = clients.get(clientId)
                        ws.send(createReturnRes('OrderRankMonitor','new',data))
                    }
                })
                // logger.info('AccountUpdate:',message)
                break
            case 'CnFuturesMarketPublic':
                tickData.set(data.InstrumentId,data)
                FuturesMarketTickSubClients.forEach((options,clientId)=>{
                    const ticks = options.ticks
                    if(ticks.length === 0 || ticks.includes(data.InstrumentId)){
                        sendMesToClient({
                            options,
                            clientId,
                            dataToSand:data,
                            channelDataKey:data.InstrumentId,
                            channelClients:FuturesMarketTickSubClients,
                            eventName:'FuturesMarketTick',
                            channelData:tickData,
                            limitTime:0
                        })
                    }
                })
                // logger.info('CnFuturesMarketPublic:',message)
                break
            case 'CnFuturesMarketMinKline':
                futuresMinKlineData.set(data.InstrumentId,data)
                FuturesMinKlineSubClients.forEach((options,clientId)=>{
                    const ticks = options.ticks
                    if(ticks.length === 0 || ticks.includes(data.InstrumentId))
                        sendMesToClient({
                            options,
                            clientId,
                            dataToSand:data,
                            channelDataKey:data.InstrumentId,
                            channelClients:FuturesMinKlineSubClients,
                            eventName:'FuturesMinKline',
                            channelData:futuresMinKlineData,
                            limitTime:0
                        })
                })
                break
            case 'AlphaCtaLog':
                switch (data.LogType) {
                    case 'ErrorOrderInfo':
                        ErrorOrderInfoSubClients.forEach((options,clientId)=>{
                            if(options.AccountType === '0' || options.AccountType ===data.AccountType){
                                const ws = clients.get(clientId)
                                ws.send(createReturnRes('ErrorOrderInfo','new',data))
                            }
                        })
                        break
                    case 'AccountAction':
                        AccountActionSubClients.forEach((options,clientId)=>{
                            if(options.AccountType === '0' || options.AccountType ===data.AccountType){
                                const ws = clients.get(clientId)
                                ws.send(createReturnRes('AccountAction','new',data))
                            }
                        })
                        break
                    case 'AccountOnline':
                        AccountOnlineSubClients.forEach((options,clientId)=>{
                            if(options.AccountType === '0' || options.AccountType ===data.AccountType){
                                const ws = clients.get(clientId)
                                ws.send(createReturnRes('AccountOnline','new',data))
                            }
                        })
                        break
                }
                break
            case 'RealBasicAnalysisChannel':
                switch (data.DataType){
                    case 'VP':
                        realVpData.set(data.Data.RealVp.InstrumentId,data.Data)
                        RealVpSubClients.forEach((options,clientId)=>{
                            let ticks = options.ticks
                            if(ticks.length === 0 || ticks.includes(data.Data.RealVp.InstrumentId))
                                sendMesToClient({
                                    options,
                                    clientId,
                                    dataToSand:{RealVp:data.Data.RealVp},
                                    channelDataKey:data.Data.RealVp.InstrumentId,
                                    channelClients:RealVpSubClients,
                                    eventName:'RealVp',
                                    channelData:realVpData,
                                })
                        })
                        break
                    case 'MarketStrength':
                        marketStrengthData.set(data.Data.InstrumentId,data.Data)
                        MarketStrengthSubClients.forEach((options,clientId)=>{
                            let ticks = options.ticks
                            if(ticks.length === 0 || ticks.includes(data.Data.InstrumentId))
                                sendMesToClient({
                                    options,
                                    clientId,
                                    dataToSand:data.Data,
                                    channelDataKey:data.Data.InstrumentId,
                                    channelClients:MarketStrengthSubClients,
                                    eventName:'MarketStrength',
                                    channelData:marketStrengthData,
                                })
                        })
                        break
                    case 'TemplateMonitor':
                        let historyData
                        // logger.info(data)
                        switch (data.Data.TemplateType){
                            case 'DominantType':
                                historyData = templateMonitorDominantTypeData
                                // logger.info('Regular History Data:',historyData)
                                // logger.info('Regular Receive Data:',data.Data)
                                if(historyData[data.Data.TemplateName]){
                                    for(let key in historyData[data.Data.TemplateName].ContractData){
                                        if(!data.Data.TemplateElement.includes(key)) delete historyData[data.Data.TemplateName].ContractData[key]
                                    }
                                    historyData[data.Data.TemplateName].TemplateElement = data.Data.TemplateElement
                                }else{
                                    historyData[data.Data.TemplateName] = data.Data
                                    historyData[data.Data.TemplateName].ContractData = {}
                                }
                                historyData[data.Data.TemplateName].ContractData[data.Data.ContractData.InstrumentId] = data.Data.ContractData
                                historyData[data.Data.TemplateName].GroupData = data.Data.GroupData
                                // historyData.set(data.Data.TemplateName,data.Data)
                                break
                            case 'RegularType':
                                historyData = templateMonitorRegularTypeData
                                // logger.info('Regular History Data:',historyData)
                                // logger.info('Regular Receive Data:',data.Data)
                                if(historyData[data.Data.TemplateName]){
                                    for(let key in historyData[data.Data.TemplateName].ContractData){
                                        if(!data.Data.TemplateElement.includes(key)) delete historyData[data.Data.TemplateName].ContractData[key]
                                    }
                                    historyData[data.Data.TemplateName].TemplateElement = data.Data.TemplateElement
                                }else{
                                    historyData[data.Data.TemplateName] = data.Data
                                    historyData[data.Data.TemplateName].ContractData = {}
                                }
                                historyData[data.Data.TemplateName].ContractData[data.Data.ContractData.InstrumentId] =data.Data.ContractData
                                historyData.regularTypeDataChanged = true
                                // historyData.set(data.Data.TemplateName,data.Data)
                                break
                            case 'CombinedType':
                                historyData = templateMonitorCombinedTypeData
                                // logger.info('Combined History Data Before:',historyData)
                                // logger.info('Combined Receive Data:',data.Data)
                                if(historyData[data.Data.TemplateName]){
                                    for(let key in historyData[data.Data.TemplateName].GroupData){
                                        if(!data.Data.TemplateElement.includes(key)) {
                                            delete historyData[data.Data.TemplateName].GroupData[key]
                                        }
                                        const value = historyData[data.Data.TemplateName].GroupData[key]
                                        if(value.GroupName === data.Data.GroupName) {
                                            value.GroupElement = data.Data.GroupElement
                                            for(let instrumentId in value.ContractData){
                                                if(!data.Data.GroupElement.includes(instrumentId)) delete value.ContractData[instrumentId]
                                            }
                                        }
                                    }
                                    historyData[data.Data.TemplateName].TemplateElement = data.Data.TemplateElement
                                    //如果GroupName 不在缓存数据中，则初始化缓存数据
                                    if(!historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]){
                                        historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]={
                                            GroupName:data.Data.GroupName,
                                            GroupElement:data.Data.GroupElement,
                                            GroupData:{},
                                            ContractData:{},
                                        }
                                    }
                                }else{
                                    historyData[data.Data.TemplateName] = {
                                        TemplateName:data.Data.TemplateName,
                                        TemplateType:data.Data.TemplateType,
                                        TemplateElement:data.Data.TemplateElement,
                                        GroupData: {},
                                    }
                                    historyData[data.Data.TemplateName].GroupData[data.Data.GroupName] = {
                                        GroupName:data.Data.GroupName,
                                        GroupElement:data.Data.GroupElement,
                                        GroupData:{},
                                        ContractData: {},
                                    }
                                }
                                // logger.info('Combined History Data After:',historyData)
                                // logger.info('GroupData:',historyData[data.Data.TemplateName].GroupData)
                                const oldCombinedGroupData = historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]
                                // logger.info('oldCombinedGroupData:',oldCombinedGroupData)
                                oldCombinedGroupData.GroupData = data.Data.GroupData
                                oldCombinedGroupData.ContractData[data.Data.ContractData.InstrumentId] = data.Data.ContractData
                                historyData.combinedTypeDataChanged = true
                                break
                            case 'SignalType':
                                historyData = templateMonitorSignalTypeData
                                // logger.info('Combined History Data Before:',historyData)
                                // logger.info('Combined Receive Data:',data.Data)
                                if(historyData[data.Data.TemplateName]){
                                    for(let key in historyData[data.Data.TemplateName].GroupData){
                                        if(!data.Data.TemplateElement.includes(key)) {
                                            delete historyData[data.Data.TemplateName].GroupData[key]
                                        }
                                        const value = historyData[data.Data.TemplateName].GroupData[key]
                                        if(value.GroupName === data.Data.GroupName) {
                                            value.GroupElement = data.Data.GroupElement
                                            for(let instrumentId in value.ContractData){
                                                if(!data.Data.GroupElement.includes(instrumentId)) delete value.ContractData[instrumentId]
                                            }
                                        }
                                    }
                                    historyData[data.Data.TemplateName].TemplateElement = data.Data.TemplateElement
                                    //如果GroupName 不在缓存数据中，则初始化缓存数据
                                    if(!historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]){
                                        historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]={
                                            GroupName:data.Data.GroupName,
                                            GroupElement:data.Data.GroupElement,
                                            GroupData:{},
                                            ContractData:{},
                                        }
                                    }
                                }else{
                                    historyData[data.Data.TemplateName] = {
                                        TemplateName:data.Data.TemplateName,
                                        TemplateType:data.Data.TemplateType,
                                        TemplateElement:data.Data.TemplateElement,
                                        GroupData: {},
                                    }
                                    historyData[data.Data.TemplateName].GroupData[data.Data.GroupName] = {
                                        GroupName:data.Data.GroupName,
                                        GroupElement:data.Data.GroupElement,
                                        GroupData:{},
                                        ContractData: {},
                                    }
                                }
                                // logger.info('Combined History Data After:',historyData)
                                // logger.info('GroupData:',historyData[data.Data.TemplateName].GroupData)
                                const oldSignalGroupData = historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]
                                // logger.info('oldCombinedGroupData:',oldCombinedGroupData)
                                // oldSignalGroupData.GroupData = data.Data.GroupData
                                oldSignalGroupData.ContractData[data.Data.ContractData.InstrumentId] = data.Data.ContractData
                                historyData.signalTypeDataChanged = true
                                break
                            case 'HedgingType':
                                historyData = templateMonitorHedgingTypeData
                                // logger.info('Hedging History Data Before:',historyData)
                                // logger.info('Hedging Receive Data:',data.Data)
                                if(historyData[data.Data.TemplateName]){
                                    for(let key in historyData[data.Data.TemplateName].GroupData){
                                        if(!data.Data.TemplateElement.includes(key)) {
                                            delete historyData[data.Data.TemplateName].GroupData[key]
                                        }
                                        const value = historyData[data.Data.TemplateName].GroupData[key]
                                        if(value.GroupName === data.Data.GroupName) {
                                            value.GroupElement = data.Data.GroupElement
                                            value.StandardId = data.Data.StandardId
                                            for(let instrumentId in value.ContractData){
                                                if(!value.GroupElement.includes(instrumentId)) delete value.ContractData[instrumentId]
                                            }
                                        }
                                    }
                                    historyData[data.Data.TemplateName].TemplateElement = data.Data.TemplateElement
                                    //如果GroupName 不在缓存数据中，则初始化缓存数据
                                    if(!historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]){
                                        historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]={
                                            GroupName:data.Data.GroupName,
                                            GroupElement:data.Data.GroupElement,
                                            GroupData:{},
                                            ContractData:{},
                                        }
                                    }
                                }else{
                                    historyData[data.Data.TemplateName] = {
                                        TemplateName:data.Data.TemplateName,
                                        TemplateType:data.Data.TemplateType,
                                        TemplateElement:data.Data.TemplateElement,
                                        GroupData:{},
                                    }
                                    historyData[data.Data.TemplateName].GroupData[data.Data.GroupName] ={
                                        GroupName:data.Data.GroupName,
                                        GroupElement:data.Data.GroupElement,
                                        ContractData:{},
                                    }
                                }
                                // logger.info('Combined History Data After:',historyData)
                                // logger.info('GroupData:',historyData[data.Data.TemplateName].GroupData)
                                const oldHedgingGroupData = historyData[data.Data.TemplateName].GroupData[data.Data.GroupName]
                                // logger.info('oldHedgingGroupData:',oldHedgingGroupData)
                                oldHedgingGroupData.ContractData[data.Data.ContractData.InstrumentId]=data.Data.ContractData
                                historyData.hedgingTypeDataChanged = true
                                break
                        }
                        historyData.dataChanged = true
                        break
                }
        }
    }catch (e) {
        logger.error(e)
    }
})
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
        }else{
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
            const data = eval("("+d+")")
            switch (data.action){
                case 'sub':
                    subChannel(data.args,ws,clientId)
                    break
                case 'unSub':
                    unSubChannel(data.args,ws,clientId)
                    break
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

setInterval(()=>{
    TemplateMonitorSubClients.forEach((options,clientId)=>{
        let templateTypes = options.templateTypes
        let ws = clients.get(clientId)
        if(templateTypes.length === 0) {
            // ws.send(createReturnRes('TemplateMonitor','new', data.Data))
            if(templateMonitorDominantTypeData.dataChanged){
                ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorDominantTypeData,TemplateType:'DominantType'}))
            }
            if(templateMonitorRegularTypeData.dataChanged){
                ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorRegularTypeData,TemplateType:'RegularType'}))
            }
            if(templateMonitorCombinedTypeData.dataChanged){
                ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorCombinedTypeData,TemplateType:'CombinedType'}))
            }
            if(templateMonitorHedgingTypeData.dataChanged){
                ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorHedgingTypeData,TemplateType:'HedgingType'}))
            }
            if(templateMonitorSignalTypeData.dataChanged){
                ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorSignalTypeData,TemplateType:'SignalType'}))
            }
        }else{
            templateTypes.forEach(item=>{
                let dataToSent = {}
                switch (item.type){
                    case 'DominantType':
                        if(templateMonitorDominantTypeData.dataChanged){
                            ws.send(createReturnRes('TemplateMonitor','new',{...templateMonitorDominantTypeData,TemplateType:'DominantType'}))
                        }
                        break
                    case 'RegularType':
                        if(templateMonitorRegularTypeData.regularTypeDataChanged){
                            if(item.templates.length === 0){
                                dataToSent = {...templateMonitorRegularTypeData}
                            }else{
                                item.templates.forEach(key=>{
                                    dataToSent[key] = templateMonitorRegularTypeData[key]
                                })
                            }
                            ws.send(createReturnRes('TemplateMonitor','new',{...dataToSent,TemplateType:'RegularType'}))
                        }
                        break
                    case 'CombinedType':
                        if(templateMonitorCombinedTypeData.combinedTypeDataChanged){
                            if(item.templates.length === 0){
                                dataToSent = {...templateMonitorCombinedTypeData}
                            }else{
                                item.templates.forEach(key=>{
                                    dataToSent[key] = templateMonitorCombinedTypeData[key]
                                })
                            }
                            ws.send(createReturnRes('TemplateMonitor','new',{...dataToSent,TemplateType:'CombinedType'}))
                        }
                        break
                    case 'SignalType':
                        if(templateMonitorSignalTypeData.signalTypeDataChanged){
                            if(item.templates.length === 0){
                                dataToSent = {...templateMonitorSignalTypeData}
                            }else{
                                item.templates.forEach(key=>{
                                    dataToSent[key] = templateMonitorSignalTypeData[key]
                                })
                            }
                            ws.send(createReturnRes('TemplateMonitor','new',{...dataToSent,TemplateType:'SignalType'}))
                        }
                        break
                    case 'HedgingType':
                        if(templateMonitorHedgingTypeData.hedgingTypeDataChanged){
                            if(item.templates.length === 0){
                                dataToSent = {...templateMonitorHedgingTypeData}
                            }else{
                                item.templates.forEach(key=>{
                                    dataToSent[key] = templateMonitorHedgingTypeData[key]
                                })
                            }
                            ws.send(createReturnRes('TemplateMonitor','new',{...dataToSent,TemplateType:'HedgingType'}))
                        }
                        break
                }
            })
        }
    })
    templateMonitorDominantTypeData.dataChanged = false
    templateMonitorRegularTypeData.dataChanged = false
    templateMonitorCombinedTypeData.dataChanged = false
    templateMonitorHedgingTypeData.dataChanged = false
    templateMonitorSignalTypeData.dataChanged = false
    templateMonitorRegularTypeData.regularTypeDataChanged = false
    templateMonitorCombinedTypeData.combinedTypeDataChanged = false
    templateMonitorHedgingTypeData.hedgingTypeDataChanged = false
    templateMonitorSignalTypeData.signalTypeDataChanged = false
},500)

logger.info("websocket 服务已运行在端口9999")

function sendMesToClient({options, channelClients, clientId,eventName, dataToSand, channelData,channelDataKey,limitTime=1}) {
    //当前限流状态，则标记数据已改变并退出
    const limitKey = clientId + channelDataKey + '_timeoutLimited'
    const limitTimeoutKey = clientId + channelDataKey + '_limitTimeout'
    const dataChangeKey = clientId + channelDataKey + '_dataChanged'
    if(options[limitKey]) return channelClients.set(clientId,{...options,[dataChangeKey]:true})
    //当前非限流状态，则推送数据
    let ws = clients.get(clientId)
    ws.send(createReturnRes(eventName,'new',dataToSand))
    //设置限流状态，并设置限流时间后推送数据
    channelClients.set(clientId,{
        ...options,
        [limitKey]:true,
        [dataChangeKey]:false,
        [limitTimeoutKey]:setTimeout(()=>{
            const opt = channelClients.get(clientId)
            //如果没有被退订
            if(!!opt){
                //如果限流期间数据有改变，则推送数据
                if(opt[dataChangeKey]) {
                    ws = clients.get(clientId)
                    if(!!ws){
                        let data
                        switch (eventName){
                            case 'RealVp':
                                const {RealVp} = channelData.get(channelDataKey)
                                data = {RealVp}
                                break
                            default:
                                data = channelData.get(channelDataKey)
                        }
                        ws.send(createReturnRes(eventName,'new',data))
                        opt[dataChangeKey] = false
                    }
                }
                //更改标记
                opt[limitKey] = false
                channelClients.set(clientId,opt)
            }
        },limitTime * 1000 )
    })
}
function subChannel(args,ws,usdrId){
    if(typeof args !== 'object' || !args.length) return ws.send(createReturnRes('error','参数格式错误',args))
    args.forEach(item=>{
        if(!item.channel) return ws.send(createReturnRes('error','缺少channel参数',item))
        const args = item.args || []
        let ticks = []
        switch (item.channel){
            case 'FuturesMarketTick':
                let FuturesMarketTickOptions = {
                    ticks:[],
                }
                if(args && args.length > 0){
                    const {type} = args[0]
                    ticks = FuturesMarketTickOptions.ticks = args[0].ticks || []
                }
                FuturesMarketTickSubClients.set(usdrId,FuturesMarketTickOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                tickData.forEach((value,key)=>{
                    if(ticks.length ===0 || ticks.includes(key))
                        ws.send(createReturnRes('FuturesMarketTick','snapshot',value))
                })
                break
            case 'FuturesMinKline':
                let FuturesMinKlineOptions = {
                    ticks:[],
                }
                if(args && args.length > 0){
                    const {type} = args[0]
                    ticks = FuturesMinKlineOptions.ticks = args[0].ticks || []
                }
                FuturesMinKlineSubClients.set(usdrId,FuturesMinKlineOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                futuresMinKlineData.forEach((value,key)=>{
                    if(ticks.length ===0 || ticks.includes(key))
                        ws.send(createReturnRes('FuturesMinKline','snapshot',value))
                })
                break
            case 'RealVp':
                let RealVpOptions = {
                    ticks:[],
                }
                if(args && args.length > 0){
                    ticks = RealVpOptions.ticks = args[0].ticks || []
                }
                RealVpSubClients.set(usdrId,RealVpOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                realVpData.forEach((value,key)=>{
                    if(ticks.length ===0 || ticks.includes(key))
                        ws.send(createReturnRes('RealVp','snapshot',value))
                })
                break
            case 'MarketStrength':
                let MarketStrengthOptions = {
                    ticks:[],
                }
                if(args && args.length > 0){
                    ticks = MarketStrengthOptions.ticks = args[0].ticks || []
                }
                MarketStrengthSubClients.set(usdrId, MarketStrengthOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                marketStrengthData.forEach((value,key)=>{
                    if(ticks.length ===0 || ticks.includes(key))
                        ws.send(createReturnRes('MarketStrength','snapshot',value))
                })
                break
            case 'TemplateMonitor':
                let TemplateMonitorOptions = {
                    templateTypes:[],
                }
                if(args && args.length > 0){
                    TemplateMonitorOptions.templateTypes = args[0].templateTypes || []
                }
                TemplateMonitorSubClients.set(usdrId, TemplateMonitorOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                if(TemplateMonitorOptions.templateTypes.length ===0){
                    ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorDominantTypeData,TemplateType:'DominantType'}))
                    ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorRegularTypeData,TemplateType:'RegularType'}))
                    ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorCombinedTypeData,TemplateType:'CombinedType'}))
                    ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorHedgingTypeData,TemplateType:'HedgingType'}))
                    ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorSignalTypeData,TemplateType:'SignalType'}))
                }else{
                    TemplateMonitorOptions.templateTypes.forEach(option=>{
                        if(option.type === 'DominantType'){
                            ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorDominantTypeData,TemplateType:'DominantType'}))
                        }
                        if(option.type === 'RegularType'){
                            if(!option.templates || option.templates.length === 0){
                                ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorRegularTypeData,TemplateType:'RegularType'}))
                            }else{
                                option.templates.forEach(templateName=>{
                                    ws.send(createReturnRes('TemplateMonitor','snapshot', {[templateName]:templateMonitorRegularTypeData[templateName],TemplateType:'RegularType'}))
                                })
                            }
                        }
                        if(option.type === 'CombinedType'){
                            if(!option.templates || option.templates.length === 0){
                                ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorCombinedTypeData,TemplateType:'CombinedType'}))
                            }else{
                                option.templates.forEach(templateName=>{
                                    ws.send(createReturnRes('TemplateMonitor','snapshot', {[templateName]:templateMonitorCombinedTypeData[templateName],TemplateType:'CombinedType'}))
                                })
                            }
                        }
                        if(option.type === 'HedgingType'){
                            if(!option.templates || option.templates.length === 0){
                                ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorHedgingTypeData,TemplateType:'HedgingType'}))
                            }else{
                                option.templates.forEach(templateName=>{
                                    ws.send(createReturnRes('TemplateMonitor','snapshot', {[templateName]:templateMonitorHedgingTypeData[templateName],TemplateType:'HedgingType'}))
                                })
                            }
                        }
                        if(option.type === 'SignalType'){
                            if(!option.templates || option.templates.length === 0){
                                ws.send(createReturnRes('TemplateMonitor','snapshot', {...templateMonitorSignalTypeData,TemplateType:'SignalType'}))
                            }else{
                                option.templates.forEach(templateName=>{
                                    ws.send(createReturnRes('TemplateMonitor','snapshot', {[templateName]:templateMonitorSignalTypeData[templateName],TemplateType:'SignalType'}))
                                })
                            }
                        }
                    })
                }
                break
            case 'AccountFund':
                let AccountFundOptions = {
                    AccountType:'0',
                    AccountNames:[],
                }
                if(args && args.length > 0){
                    const {AccountType,AccountNames} = args[0]
                    AccountFundOptions.AccountType = AccountType || '0'
                    AccountFundOptions.AccountNames = AccountNames || []
                }
                AccountFundSubClients.set(usdrId,AccountFundOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                fundData.forEach((value,key)=>{
                    if(AccountFundOptions.AccountNames.includes(key))
                        ws.send(createReturnRes('AccountFund','snapshot',value))
                })
                break
            case 'AccountPosition':
                let AccountPositionOptions = {
                    AccountType:'0',
                    AccountNames:[],
                }
                if(args && args.length > 0){
                    const {AccountType,AccountNames} = args[0]
                    AccountPositionOptions.AccountType = AccountType || '0'
                    AccountPositionOptions.AccountNames = AccountNames || []
                }
                AccountPositionSubClients.set(usdrId,AccountPositionOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                // positionData.forEach((value,key)=>{
                //     if(AccountPositionOptions.AccountNames.includes(key))
                //         ws.send(createReturnRes('AccountPosition','snapshot',value))
                // })
                break
            case 'AccountUpdate':
                let AccountUpdateOptions = {
                    AccountType:'0',
                    AccountNames:[],
                }
                if(args && args.length > 0){
                    const {AccountType,AccountNames} = args[0]
                    AccountUpdateOptions.AccountType = AccountType || '0'
                    AccountUpdateOptions.AccountNames = AccountNames || []
                }
                AccountUpdateSubClients.set(usdrId,AccountUpdateOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                break
            case 'OrderRankMonitor':
                let OrderRankMonitorOptions = {
                    AccountIDs:[],
                }
                if(args && args.length > 0){
                    const {AccountIDs} = args[0]
                    OrderRankMonitorOptions.AccountIDs = AccountIDs || []
                }
                OrderRankMonitorClients.set(usdrId,OrderRankMonitorOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                break
            case 'ErrorOrderInfo':
                let ErrorOrderInfoOptions = {
                    AccountType:'0',
                }
                if(args && args.length > 0){
                    const {AccountType} = args[0]
                    ErrorOrderInfoOptions.AccountType = AccountType || '0'
                }
                ErrorOrderInfoSubClients.set(usdrId,ErrorOrderInfoOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                break
            case 'AccountAction':
                let AccountActionOptions = {
                    AccountType:'0',
                }
                if(args && args.length > 0){
                    const {AccountType} = args[0]
                    AccountActionOptions.AccountType = AccountType || '0'
                }
                AccountActionSubClients.set(usdrId,AccountActionOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
                break
            case 'AccountOnline':
                let AccountOnlineOptions = {
                    AccountType:'0',
                }
                if(args && args.length > 0){
                    const {AccountType} = args[0]
                    AccountOnlineOptions.AccountType = AccountType || '0'
                }
                AccountOnlineSubClients.set(usdrId,AccountOnlineOptions)
                ws.send(createReturnRes('sub','succeed',{channel:item.channel,args}))
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
            case 'FuturesMarketTick':
                FuturesMarketTickSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'FuturesMinKline':
                FuturesMarketTickSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'RealVp':
                RealVpSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'MarketStrength':
                MarketStrengthSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'TemplateMonitor':
                TemplateMonitorSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'AccountFund':
                AccountFundSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'AccountPosition':
                AccountPositionSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'AccountUpdate':
                AccountUpdateSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'OrderRankMonitor':
                OrderRankMonitorClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'ErrorOrderInfo':
                ErrorOrderInfoSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'AccountAction':
                AccountActionSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            case 'AccountOnline':
                AccountOnlineSubClients.delete(usdrId)
                ws.send(createReturnRes('unSub','succeed',{channel:item.channel,args}))
                break
            default:
                ws.send(createReturnRes('error','未知的频道',item.channel))
        }
    })
}
function deleteClient(clientId){
    clients.delete(clientId)
    FuturesMarketTickSubClients.delete(clientId)
    FuturesMinKlineSubClients.delete(clientId)
    AccountUpdateSubClients.delete(clientId)
    AccountPositionSubClients.delete(clientId)
    AccountFundSubClients.delete(clientId)
    ErrorOrderInfoSubClients.delete(clientId)
    AccountActionSubClients.delete(clientId)
    AccountOnlineSubClients.delete(clientId)
    RealVpSubClients.delete(clientId)
    MarketStrengthSubClients.delete(clientId)
    TemplateMonitorSubClients.delete(clientId)
    OrderRankMonitorClients.delete(clientId)
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
