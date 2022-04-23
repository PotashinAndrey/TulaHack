import Application from './backend/Application.js';
import methods     from './backend/api.js';
import config      from './config.js';

main();

/** */
  async function main() {
    const application = new Application(config)
      .static()
      .methods(methods);

    application.launch();
  }

