import { Telegraf } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';

const bot = new Telegraf("5307549521:AAHuZtS_HqImYOfJ2HED4siMuQEK2H-Kgz4")

bot.start((ctx) => ctx.reply(`TulHackBot готов к работе`));

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id)

  ctx.leaveChat()
});

bot.command('log', ctx => {
    ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то лог");
});

bot.command('random', ctx => {
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