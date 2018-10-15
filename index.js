'use strict'

const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_BOT_TOKEN

const bot = new TelegramBot(token, {polling: true})

const movie = require('./lib/movie.js')

bot.onText(/\/movie (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const resp = await movie(match[1])
  bot.sendMessage(chatId, resp)
})
