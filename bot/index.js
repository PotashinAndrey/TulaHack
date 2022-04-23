import { Telegraf } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';

const bot = new Telegraf("5307549521:AAHuZtS_HqImYOfJ2HED4siMuQEK2H-Kgz4")

bot.start((ctx) => ctx.reply(`TulHackBot готов к работе`));

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})

// bot.on('text', (ctx) => {
  // Explicit usage
//   ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.message.from.username}`)

  // Using context shortcut
//   ctx.reply(`Hello ${ctx.state.role}`)
// })

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
  
    // keyboard.reply()
    await ctx.reply('Команды', keyboard.reply())
    // await ctx.reply('Simple inline keyboard', keyboard.inline())
  })

// bot.on('/log', ctx => {
//   ctx.reply(`Log`)
// });

// bot.action('/log', ctx => {
//     ctx.telegram.sendMessage(ctx.message.chat.id, "какой-то лог");
// });

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))