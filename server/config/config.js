import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { CLIENT_RENEG_WINDOW } from 'tls';

class Config{
  static #KEYS = ['MONGO','SESSION_SECRET','CLIENT_URL','PORT','JWT','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI','DB_HOST','DB_USER','DB_PASSWORD','DB_NAME']
  static #filepath = fileURLToPath(import.meta.url);
  static #dirpath = path.resolve(Config.#filepath, '../keys.env');
  static #isInitalized = false;

  constructor() {
    Config.initConfig();  
  }

  /**
   * 해당 Config가 모든 키값을 가지고 있는 지 체크하는 함수
   * @returns {boolean} true 모든 키값을 가지고 있음, false 키값이 누락됨 
   */
  static initConfig() {
    // 이미 초기화 상태일 경우 true 반환
    if (Config.#isInitalized) return true; 

    dotenv.config({ path: Config.#dirpath });


    const nonExistentKeyList = Config.#KEYS.reduce((nonExistentKeys,key) => {
      if(!process.env[key]) {
        nonExistentKeys.push(key);
      }
      
      return nonExistentKeys;
    }, []);

    Config.#isInitalized = nonExistentKeyList.length === 0;

    console.log(Config.#isInitalized ? '✅ 모든 키가 존재합니다.' : `❌ ${nonExistentKeyList} .env에 해당 키가 존재하지 않습니다.`);

    return Config.#isInitalized;
  }

  /**
   * Config에서 해당 키값을 가져오는 함수
   * @param {string} key 의 이름 
   * @returns {string} key의 value
   */
  static get(key) {
    if (!Config.#isInitalized) {
      console.log('❌ Config가 초기화 되지 않았습니다.');
      Config.initConfig();
    }

    if (!process.env[key]) throw new Error(`❌ ${key} 키가 존재하지 않습니다.`);

    return process.env[key];
  }
}

export default Config;

