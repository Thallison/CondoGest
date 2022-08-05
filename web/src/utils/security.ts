import * as CryptoJS from 'crypto-js';
import { KEY_AES } from './constants';
const key = CryptoJS.enc.Utf8.parse(KEY_AES);
const iv = CryptoJS.enc.Utf8.parse(KEY_AES);

export function encryptObjectAES(encriptString: string) {    
    var encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(JSON.stringify(encriptString)), key,
        {
            keySize: 128 / 8,
            iv: iv
        });
    return encrypted.toString();
}

export function encryptTextAES(encriptString: string) {    
    var encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(encriptString), key,
        {
            keySize: 128 / 8,
            iv: iv
        });
    return encrypted.toString();
}

export function decryptObjectAES(dencriptString: string) {
    var bytes  = CryptoJS.AES.decrypt(dencriptString,  key, {
        keySize: 128 / 8,
        iv: iv
    });
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

export function decryptTextAES(dencriptString: string) {
    var bytes  = CryptoJS.AES.decrypt(dencriptString,  key, {
        keySize: 128 / 8,
        iv: iv
    });
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}