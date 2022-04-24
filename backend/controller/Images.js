import config from "../../config.js";
import db from "../service/DB.js";

const ROOT = config.storage;

/**  {Advert} @class
  */
export default class Images {
  static async upload(params) {
    return await db('INSERT INTO images (id) values ($1)', [params.id]);
  }

  static async add(params) {
    const { ad, image } = params; // ID объявления, ID картинки
    return await db('INSERT INTO ad_images (ad, image) values ($1, $2)', [ad, image]);
  }

  static async get(params) {
    return await db('SELECT * from images');
  }
}
