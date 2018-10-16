'use strict'

require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, {polling: true})

const movie = require('./lib/movie.js')
const spotify = require('./lib/spotify.js')

bot.onText(/\/movie (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const resp = await movie(match[1])
  bot.sendMessage(chatId, resp)
})

bot.onText(/\/spotify (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const resp = await spotify(match[1])
  bot.sendMessage(chatId, resp)
})
