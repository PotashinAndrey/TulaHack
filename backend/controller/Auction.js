import { v4 } from 'uuid';
import db from "../service/DB.js";
import Images from './Images.js';

/**  {Auction} @class
  */
export default class Auction {
  static create(params) {
    try {
      console.log("AUCTION.CREATE", params);
      const {
        author,
        name,
        description,
        price,
        openedDate,
        image
      } = params; // ID объявления, ID картинки
      const id = v4();
      db(
        'INSERT INTO ads (id, author, name, description, price, opened_date) values ($1, $2, $3, $4, $5, $6)',
        [id, author, name, description, price, openedDate ?? +new Date()]
      );
      Images.add({
        ad: id,
        image
      });
      return {};
    } catch(error) {
      console.log(error);
    }
  }

  static get() {
    return db(
      `SELECT ads.id, ads.author, ads.name, ads.description, ads.price, ads.opened_date, ads.opened, ad_images.image
        FROM ads
          JOIN ad_images ON ad_images.ad = ads.id
        LIMIT 3`
      )
  }
}
