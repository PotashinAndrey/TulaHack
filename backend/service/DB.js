import Connection from "./Connection.js";

export default async function db(query, values) {
  return new Promise((resolve, reject) => {
    const connecttion = new Connection();
    const client = connecttion.getClient();

    const callback = (error, result) => {
      if (!error) {
        // console.log(result?.rows);
        resolve(result?.rows);
      } else {
        // console.log('error', error);
        reject(error);
      }
    };

    values
      ? client.query(query, values, callback)
      : client.query(query, callback);

    // connecttion.closeClient();
  });
}
