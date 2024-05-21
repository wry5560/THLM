import {HttpStatus} from '@nestjs/common'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const NOUSERNAME_OR_NOPASSWORD = 'NOUSERNAME_OR_NOPASSWORD'
export const NO_ACCOUNT = 'NO_ACCOUNT'
export const NO_ACCOUNT_ID = 'NO_ACCOUNT_ID'
export const NO_STRATEGY_ID = 'NO_STRATEGY_ID'
export const NOT_FIND_STRATEGY = 'NOT_FIND_STRATEGY'
export const API_NOT_FOUND = 'API_NOT_FOUND'
export const NO_APIKEY = 'NO_APIKEY'
export const NO_SECRET = 'NO_SECRET'
export const NO_PASSPHRASE = 'NO_PASSPHRASE'
export const ACCOUNT_EXIST = 'ACCOUNT_EXIST'


export const errorCode = {
    [LOGIN_FAIL] : {code: HttpStatus.BAD_REQUEST, message: '账号或密码错误'},
    [NOUSERNAME_OR_NOPASSWORD] : {code: HttpStatus.BAD_REQUEST, message: '缺少账号或密码参数'},
    [NO_ACCOUNT] : {code: HttpStatus.BAD_REQUEST, message: '账号不存在'},
    [NO_ACCOUNT_ID] : {code: HttpStatus.BAD_REQUEST, message: '缺少Account ID参数'},
    [NO_STRATEGY_ID] : {code: HttpStatus.BAD_REQUEST, message: '缺少STRATEGY ID参数'},
    [NOT_FIND_STRATEGY] : {code: HttpStatus.BAD_REQUEST, message: '没找到对应的STRATEGY'},
    [API_NOT_FOUND] : {code: HttpStatus.BAD_REQUEST, message: 'Api not found'},
    [NO_APIKEY] : {code: HttpStatus.BAD_REQUEST, message: '缺少ApiKey'},
    [NO_SECRET] : {code: HttpStatus.BAD_REQUEST, message: '缺少Secret'},
    [NO_PASSPHRASE] : {code: HttpStatus.BAD_REQUEST, message: '缺少Passphrase'},
    [ACCOUNT_EXIST] : {code: HttpStatus.BAD_REQUEST, message: '账户名已存在'},
}
