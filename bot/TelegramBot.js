import { Telegraf } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';

/** {TelegramBot} @class
  */
  export default class TelegramBot {
  /** @type {Telegraf} */
    #bot = null;

  /** */
    config = {}

  /** @constructor
    */
    constructor(config) {
      this.config = config.telegram;
      const bot = new Telegraf(this.config.token);
      this.#bot = bot;
    }

  /** */
    init() {
      if (!this.#bot) return this;

      this.#bot.start((ctx) => {
        console.log('новый пользователь')
        ctx.reply(`TulHackBot готов к работе`)
      });

      this.#bot.command('quit', (ctx) => {
        console.log('ушел пользователь')
        // ctx.telegram.leaveChat(ctx.message.chat.id)
        ctx.leaveChat()
      });

      this.#bot.command('log', ctx => {
        console.log('запрос логов', ctx.message.chat.id)
        ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то лог");
      });

      this.#bot.command('random', async (ctx) => {
        console.log('случайная ставка')
        // const r = await api("auction.create", {
        //     name: "test Name",
        //     description: "test desription",
        //     price: 3200,
        //     file: "",
        //     author: 1,
        //     image: ""
        //   });

        //   console.log(r);
        ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то рандом");
      });

      this.#bot.on('text', async (ctx) => {
        const keyboard = Keyboard.make([
          ['/log', '/random', '/quit']
        ])

        // console.log('случайная ставка')
        await ctx.reply('Команды', keyboard.reply());
      });

      return this;
    }

  /** */
    launch() {
      if (!this.#bot) return this;
      this.#bot.launch();
      console.log(`[Telegram] bot ${this.config.name} is started`);

      process.once('SIGINT', () => this.#bot.stop('SIGINT'))
      process.once('SIGTERM', () => this.#bot.stop('SIGTERM'))
    }

    message(text) {
      const chat = this.config.chat;
      this.#bot.telegram.sendMessage(chat, text);
      return this;
    }
  };
