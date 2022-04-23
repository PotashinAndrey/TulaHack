import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import https from 'https';
import fs from 'fs';
// import fetch from 'node-fetch';

/**  */
  export default class Application {
  /**  */
    constructor(config) {
      this.config = config;
    }

  /** @type Koa (приложение) */
  #app = null;

  /** @type Koa (static для фронта) */
  #htdocs = null;

  /** @type Koa (методы для апи) */
  #methods = null;

  /** static */
    static() {
      const htdocs = new Koa();
      htdocs.use(serve(this.config.serve));

      this.#htdocs = htdocs;
      return this;
    }

  /** methods */
    methods(methods) {
      const api = new Koa();
      api.use(bodyParser());

      // api call

      this.#methods = api;
      return this;
    }

  /** */
    launch() {
      const app = new Koa();
      app.use(mount('/', this.#htdocs));
      app.use(mount('/api', this.#methods));

      app.listen(this.config.port, () => {
        const location = `http://${this.config.host}:${this.config.port}`;
        console.log(`[HTTP] server running at ${location}`);
      });

      try {
        const ssl = {
          key:  fs.readFileSync(this.config.ssl + this.config.key),
          cert: fs.readFileSync(this.config.ssl + this.config.cert)
        };

        https.createServer(ssl, app.callback()).listen(this.config.https, () => {
          const location = `https://${this.config.host}:${this.config.https}`;
          console.log(`[HTTPS] server running at ${location}`);
        });
      } catch (e) {
        console.error(e);
      }

      this.#app = app;
      return this;
    }
  }
