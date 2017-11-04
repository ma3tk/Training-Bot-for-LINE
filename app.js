const express = require('express')
const middleware = require('@line/bot-sdk').middleware

const app = express()

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
    channelSecret: 'YOUR_CHANNEL_SECRET'
    }

app.post('/webhook', middleware(config), (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
  })

app.listen(8080)
