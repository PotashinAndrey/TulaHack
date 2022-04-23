import DB from './Connection.js';

/**  {Lots} @class
  */
export default class Lots {
  static create(params) {
    console.log("LOT.CREATE", params);
    const {
      ad,
      author,
      amount
    } = params;
    const db = new DB();
    const client = db.getClient();
    client.query('INSERT INTO bids (ad, author, amount) values ($1, $2, $3)', [ad, author, amount], (error, result) => {
        if (!error) {
          console.log(result?.rows);
        } else {
          console.log('error', error);
        }
    });
    return {};
  }
}
