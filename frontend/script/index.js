import locator from './locator.js';
import Channel from '../class/Browser.js';
import Router from '../class/Router.js';

import CreateAuc from "../pages/CreateAuc.js";

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(reg => console.log('service worker registered'))
//     .catch(err => console.log('service worker not registered', err));
// }

main();

/** Инициализация приложения
  */
  async function main() {
    const standalone =
         window.navigator.standalone // on iOS Safari
      || window.matchMedia?.('(display-mode: standalone)')?.matches // on Android Chrome
      || false;

    // if (standalone) alert('PWA');

    const channel = new Channel();

    const router = routing();

    locator.services = {
      channel,
      router,
      go: (path) => {
        if (!(path instanceof Array)) path = [path];
        // router.path(path);
        window.location.hash = path;
      }
      // storage
    };

    router.callback((e) => {
      // console.log("ROUTE CALLBACK", e);
      const path = window.location.hash.replace(/^#/, '').split('/');
      channel.send('app-routing', path);
    }).start();
  }

// #region [Private]
/** routing */
  function routing() {
    const root = document.body;
    const router = Router.hash(root)
      .route({
        path: 'login',
        node: 'page-login',
      })
      .route({
        name: 'main',
        node: 'create-auc',
        default: true,
        nesting: new Router()
          .route({
            path: 'camera',
            node: 'page-camera',
            default: true
          })
          .route({
            path: 'donate',
            node: 'page-donate',
          })
          .route({
            path: 'success',
            node: 'page-success'
          })
          .route({
            path: 'stickers',
            node: 'page-stickers'
          })
          .route({
            path: 'friends',
            node: 'page-friends'
          })
          .route({
            path: 'profile',
            node: 'page-profile'
          })
      });

    return router;
  }
// #endregion

// PWA custom install
// window.addEventListener('beforeinstallprompt', e => {
//   e.preventDefault();
//   e.prompt();
// });
