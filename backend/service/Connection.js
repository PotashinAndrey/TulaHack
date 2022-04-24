import PG from 'pg';
import config from '../../config.js';

const Client = PG.Client;

export default class Connection {
    constructor() {
        this.client = new Client(config.database);
        this.client.connect();
    }

    getClient() {
        return this.client;
    }

    closeClient() {
        this.client.end();
    }
}
