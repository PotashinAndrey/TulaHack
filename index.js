import Application from './backend/Application.js';
import TelegramBot from './bot/TelegramBot.js';
import methods     from './backend/api.js';
import config      from './config.js';

main();

/** */
  async function main() {
    const application = new Application(config)
      .static()
      .uploader()
      .methods(methods);

    application.launch();

    const telegramBot = new TelegramBot(config)
      .init();

    telegramBot.launch();
  }

