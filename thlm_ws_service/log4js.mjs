import log4js from 'log4js';
log4js.configure({
    appenders: {
        ruleConsole: {type: 'console'},
        walletFile: {
            type: 'dateFile',
            // 这个目录是相对于根目录的，即与app.js 是同一级的
            filename: 'logs/ws_service-',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 30,
            alwaysIncludePattern: true
        },
    },

    categories: {
        main: {appenders: ['ruleConsole', 'walletFile'], level: 'debug'},
        default: {appenders: ['ruleConsole', 'walletFile'], level: 'info'}
    }
});
export const logger = log4js.getLogger('main');

export const use = function (app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //这样会自动记录每次请求信息，放在其他use上面
    // logger.debug('log4js 启动')
    app.use(log4js.connectLogger(logger, {level: 'info', format: ':method :url'}));
}
