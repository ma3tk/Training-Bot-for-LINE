require('dotenv').config();

const express = require('express');
const line = require('node-line-bot-api');
const bodyParser = require('body-parser');
const app = express();

// 送信元の検証にrawBodyが必要
app.use(bodyParser.json({
    verify(req,res,buf) {
        req.rawBody = buf
    }
}));

// LINE BOT SDK 初期化
line.init({
    accessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
});

app.post('/webhook/', line.validator.validateSignature(), (req, res) => {
    // get content from request body
    const promises = req.body.events.map(event => {
        // reply message
        return line.client.replyMessage({
            replyToken: event.replyToken,
            messages: [{ // 最大5件
                type: 'text',
                text: event.message.text
            }]
        });
    });
    Promise.all(promises).then(() => res.json({ success: true }));
});

app.listen(process.env.PORT || 8080)
