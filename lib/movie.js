'use strict'

const got = require('got')

// douban movie search
module.exports = q => {
  return got(`https://api.douban.com/v2/movie/search?q=${encodeURIComponent(q)}`)
    .then(res => `${q}: ${JSON.parse(res.body).subjects[0].alt}`)
    .catch(err => err.response.body)
}
