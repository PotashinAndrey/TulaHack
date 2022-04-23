import PG from 'pg';
const Client = PG.Client;

export default class Controller {
    constructor() {
        this.client = new Client({
            host: 'localhost',
            user: 'postgres',
            port: 5432,
            password: '1234',
            database: 'TulaHack'
        });
        this.client.connect();
    }

    getClient() {
        return this.client;
    }

    closeClient() {
        this.client.end();
    }
}