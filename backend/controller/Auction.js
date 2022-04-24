import DB from './Connection.js';
import { v4 } from 'uuid';
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
      const db = new DB();
      const client = db.getClient();
      client.query(
        'INSERT INTO ads (id, author, name, description, price, opened_date) values ($1, $2, $3, $4, $5, $6)',
        [id, author, name, description, price, openedDate ?? +new Date()],
        (error, result) => {
          if (!error) {
            console.log(result?.rows);
          } else {
            console.log('error', error);
          }
        }
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
}
