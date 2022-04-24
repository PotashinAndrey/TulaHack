import Application from './backend/Application.js';
import TelegramBot from './bot/TelegramBot.js';
import methods     from './backend/api.js';
import config      from './config.js';

main();

/** */
  async function main() {
    const telegramBot = new TelegramBot(config)
      .init();

    telegramBot.launch();

    const application = new Application(config)
      .static()
      .uploader()
      .methods(methods, telegramBot.message);

    application.launch();
  }

