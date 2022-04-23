import { promises } from "fs";
import path from "path";
import config from "../../config.js";
import DB from './Connection.js';

const ROOT = config.storage;

/**  {Advert} @class
  */
export default class Images {
  static upload(params) {
    console.log("UPLOAD", params);
    return {};
  }

  static async add(params) {
    const { advert, image } = params; // ID объявления, ID картинки
    // сходить в БД, привзять ID картинки к объявлению
    // return
  }

  static async get(params) {
    return new Promise((resolve, reject) => {
      console.log('PARAMS', params);

      const { advert } = params; // ID объявления
      const db = new DB();
      const client = db.getClient();
      client.query('SELECT * from images', (error, result) => {
          if (!error) {
            console.log(result.rows);
            resolve(result.rows);
          } else {
            console.log('error', error);
            reject(error);
          }
      });
    });
    // сходить в БД, взять ID картинок по объявлению
    // создать урлы картинок
    // return
  }
}
