import { Telegraf } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';
import api from "./api.js";

const bot = new Telegraf("5307549521:AAHuZtS_HqImYOfJ2HED4siMuQEK2H-Kgz4")

bot.start((ctx) => ctx.reply(`TulHackBot готов к работе`));

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id)

  ctx.leaveChat()
});

bot.command('log', ctx => {
    ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то лог");
});

bot.command('random', async (ctx) => {
    const r = await api("auction.create", {
        name: "test Name",
        description: "test desription",
        price: 3200,
        file: "",
        author: 1,
        image: ""
      });

      console.log(r);

    ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то рандом");
});

bot.on('text', async (ctx) => {
    const keyboard = Keyboard.make([
      ['/log', '/random', '/quit']
    ])
  
    await ctx.reply('Команды', keyboard.reply())
  })

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))