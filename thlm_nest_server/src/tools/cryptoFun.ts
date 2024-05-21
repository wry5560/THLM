import { Logger } from "@nestjs/common/services";
const logger = new Logger('cryptoFun')
export const cryptoJs = require("crypto-js") 

const key = cryptoJs.enc.Hex.parse('a708dde0ca9a3aca5b3265e0ae396941');

// const secret = '2E37D45E74BD751ADDAF8341BF41B6AE'

export const Decrypt = (word) =>{
    // this.logger.log(cryptoJs.format.Hex.parse(word))
    let decrypt = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
    })
    // this.logger.log(decrypt)
    let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8)
    return decryptedStr//.toString()
}

export const Encrypt = (word:string) => {
    let encrypted = cryptoJs.AES.encrypt(word, key, {
        mode: cryptoJs.mode.ECB, 
        padding: cryptoJs.pad.Pkcs7 
    });
    // this.logger.log(encrypted)
    return encrypted.ciphertext.toString()//encrypted.toString()
    // return encrypted.toString()
}


// this.logger.log(Encrypt(secret))
