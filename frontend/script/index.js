import locator from './locator.js';
import Channel from '../class/Browser.js';
import Router from '../class/Router.js';

import CreateAuc from "../pages/CreateAuc.js";
import Lot from "../pages/Lot.js";

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
        name: 'main',
        node: 'create-auc',
        // default: true,
      })
      .route({
        name: 'lotItem',
        node: 'lot-auc',
        default: true,
      });

    return router;
  }
// #endregion

// PWA custom install
// window.addEventListener('beforeinstallprompt', e => {
//   e.preventDefault();
//   e.prompt();
// });
