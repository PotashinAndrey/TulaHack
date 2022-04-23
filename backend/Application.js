import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import multer from '@koa/multer';
import https from 'https';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
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

  /** @type Koa (загрузка файлов) */
    #uploader = null;

  /** static */
    static() {
      const htdocs = new Koa();
      htdocs.use(serve(this.config.serve));

      this.#htdocs = htdocs;
      return this;
    }

  /** */
    uploader() {
      const uploader = new Koa();
      const config = this.config;

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, config.storage);
        },
        filename: function (req, file, cb) {
          console.log('FILE', file);
          cb(null, uuid.v4() + path.extname(file.originalname));
        }
      })

      const handler = multer({ storage });
      // uploader.use();

      // uploader.use(handler.single('image'))
      uploader.use(handler.any()) // !
      uploader.use(async ctx => {
        // the parsed body will store in ctx.request.body
        // if nothing was parsed, body will be an empty object {}
        // ctx.body = ctx.request.body;
        // console.log(ctx.request);
        // api call
        console.log('ctx.request.files', ctx.request.files);
        console.log('ctx.files', ctx.files);
        console.log('ctx.request.body', ctx.request.body);
        // дергать апи
        ctx.body = {"result": "ok"};
      });

      this.#uploader = uploader;
      return this;
    }

  /** methods */
    methods(methods) {
      const api = new Koa();
      api.use(bodyParser());

      api.use(async ctx => {
        // the parsed body will store in ctx.request.body
        // if nothing was parsed, body will be an empty object {}
        // ctx.body = ctx.request.body;
        console.log(ctx.request.body);
        // api call
        console.log(ctx.request.path);
      });

      this.#methods = api;
      return this;
    }

  /** */
    launch() {
      const app = new Koa();
      app.use(mount('/', this.#htdocs));
      app.use(mount('/api', this.#methods));
      app.use(mount('/upload', this.#uploader));

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
