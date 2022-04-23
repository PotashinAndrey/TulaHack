import { promises } from "fs";
import path from "path";
import config from "../../config.js";

const ROOT = config.storage;

/**  {Advert} @class
  */
export default class Images {
  static upload(params) {

  }

  static async add(params) {
    const { advert, image } = params; // ID объявления, ID картинки
    // сходить в БД, привзять ID картинки к объявлению
    // return
  }

  static async get(params) {
    const { advert } = params; // ID объявления
    // сходить в БД, взять ID картинок по объявлению
    // создать урлы картинок
    // return
  }
}
