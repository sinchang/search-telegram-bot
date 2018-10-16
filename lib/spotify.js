'use strict'

const got = require('got')

module.exports = q => {
  return got
    .post(`https://accounts.spotify.com/api/token`, {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString('base64')
      },
      body: {
        grant_type: 'client_credentials'
      },
      form: true
    })
    .then(res => {
      return JSON.parse(res.body).access_token
    })
    .then(at => {
      return got(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          q
        )}&type=track`,
        {
          headers: {
            Authorization: 'Bearer ' + at
          }
        }
      ).then(
        res =>
          `${q}: ${JSON.parse(res.body).tracks.items[0].external_urls.spotify}`
      )
    })
    .catch(err => err.response.body)
}
