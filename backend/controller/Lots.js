import db from "../service/DB.js";

/**  {Lots} @class
  */
export default class Lots {
  static async create(params) {
    console.log("LOT.CREATE", params);
    const {
      ad,
      author,
      amount
    } = params;
    return await db('INSERT INTO bids (ad, author, amount) values ($1, $2, $3)', [ad, author, amount]);
  }
}
