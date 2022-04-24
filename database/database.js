import PG from 'pg';
const Client = PG.Client;

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'TulaHack'
});
client.connect();

client.query('SELECT * from images', (error, result) => {
    if (!error) {
        console.log(result.rows);
    } else {
        console.log('error', error);
    }
    client.end();
});
