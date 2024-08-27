import { isDev } from './config';

// const webSocketUrl = isDev ? '192.168.32.18:9999' : 'websocket.thlm.bond';
const webSocketUrl = 'websocket.thlm.bond';
const wsUrl = 'wss://' + webSocketUrl + '?userId=' + getDeviceUniqueId();

let noReconnect = false;
let lockReconnect = false;
let websocketConnected = false;
let subedChannels = {};
let dataParser = function(data) {
    if (data.event === 'unSub') {
        data.message === 'succeed' ? delete subedChannels[data.data.channel] : createMessage.error('UnSub失败,Channel:' + data.data);
      } else {
        customParserFun.forEach((fun) => {
          fun(data);
        });
      }
}

let wsSuccessAction = function(){
    Object.keys(subedChannels).forEach((key) => {
        subChannel(key, subedChannels[key]);
      });
}

let customParserFun = [
    function (data) {
      console.log(data);
    },
  ];

  export let WebSocketClient = initWebsocket();
  export const setDataParserFun = (fun) => {
    customParserFun = [fun];
  };
  export const addDataParserFun = (fun) => {
    customParserFun.push(fun);
  };
  export const setWsSuccessActionFun = (fun) => {
    wsSuccessAction = fun;
  };
  
  //订阅频道方法
  export const subChannel = (channel, arg = {}) => {
    // debugger
    subedChannels[channel] = { ...arg };
    if (websocketConnected && WebSocketClient?.readyState === 1) {
      WebSocketClient.send(
        JSON.stringify({
          action: 'sub',
          args: [
            {
              channel: channel,
              option: arg,
            },
          ],
        })
      );
    }
  };
  
  //取消订阅频道方法
  export const unSubChannel = (channel, arg = {}) => {
    if (websocketConnected && WebSocketClient?.readyState === 1) {
      WebSocketClient.send(
        JSON.stringify({
          action: 'unSub',
          args: [
            {
              channel: channel,
            },
          ],
        })
      );
    }
  };
  //取消当前所有订阅
  export const unSubAll = function () {
    if (websocketConnected && WebSocketClient?.readyState === 1) {
      Object.keys(subedChannels).forEach((key) => {
        unSubChannel(key, subedChannels[key]);
      });
    }
  };
  function initWebsocket() {
    try {
      console.log('建立websocket连接');
      let ws = new WebSocket(wsUrl);
      ws.onopen = websocketonopen;
      ws.onmessage = websocketonmessage;
      ws.onerror = websocketonerror;
      ws.onclose = websocketclose;
      return ws;
    } catch (e) {
      console.log(e);
      reconnect();
    }
  }
  function websocketonopen() {
    console.log('websocket已连接');
    websocketConnected = true;
    //链接后订阅市场行情数据
    wsSuccessAction();
  }
  function websocketonerror(e) {
    console.log('链接错误:', e);
    WebSocketClient?.close();
  }
  function websocketonmessage(e) {
    const data = JSON.parse(e.data);
    dataParser(data);
  }
  function websocketclose(e) {
    console.log('断开连接', e);
    websocketConnected = false;
    if (!noReconnect) {
      reconnect();
    }
  }
  function reconnect() {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(() => {
      // 没连接上会一直重连，设置延迟避免请求过多
      WebSocketClient = initWebsocket();
      lockReconnect = false;
    }, 3000);
  }


function getDeviceUniqueId() {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    const uid = navigatorInfo.mimeTypes.length +
                navigatorInfo.userAgent.replace(/\D+/g, '') +
                navigatorInfo.plugins.length +
                screenInfo.height +
                screenInfo.width +
                screenInfo.pixelDepth;
    return uid;
}