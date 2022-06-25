const express = require('express')
const dotenv = require("dotenv").config();
const MailComposer = require('nodemailer/lib/mail-composer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const app = express()
const port = 5000

const client_id = process.env.GAMIL_API_CLIENT_ID;
const client_secret = process.env.GMAIL_API_CLIENT_SECRET;
const redirect_uris = "http://localhost:5000";
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const refreshToken = "1//0gsrTiMOqCh1aCgYIARAAGBASNwF-L9Ir1PVPIGNW7hWyMdBluKKd3KGI5yHfh1xobhcEaphFtfhnuYWY0ngLPFDzyDUb_iF81DM";

// try to get this token using puppeter browser 
const accessTokenBrowserCode = "4/0AX4XfWjx4Du_AdTslIObye7ooi5KjQfSPL420zC-j0X03yjXWjrEHZ3-6cahmqrWo9uVRw";

app.get("/sendEmail",async(req,res)=>{
    
    const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GMAIL_SCOPES,
    });

    console.log(url);

    res.send(url)

})

app.get('/refreshtoken', async(req, res) => {
    const tokens = await getRefreshTokens(accessTokenBrowserCode);
    console.log(tokens,"tokens");
    const sentID = await main(tokens);
    res.json(sentID);
})

async function getRefreshTokens(browserToken) {
    const allTokens = new Promise((resolve,reject)=>{
        oAuth2Client.getToken(browserToken).then(({ tokens }) => {
            // console.log(tokens);
             resolve(tokens);
        });
    })
    return allTokens;
}

const getGmailService = async(tokensObj) => {
    oAuth2Client.setCredentials(tokensObj);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    return gmail;
};

const encodeMessage = (message) => {
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
};

const sendMail = async (options,refCurrentTokens) => {
    const gmail = await getGmailService(refCurrentTokens);
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: rawMessage,
      },
    });
    return id;
};
const main = async (refCurrentTokens) => {
    const fileAttachments = [
        {
          filename: 'attachment1.txt',
          content: 'This is a plain text file sent as an attachment',
        },
        {
          path: path.join(__dirname, './assets/ssss1.png'),
        },
        {
          filename: 'websites.pdf',
          path: 'https://images.unsplash.com/photo-1655676127380-616b9aadb62c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        },
    
        {
          filename: 'image.png',
          content: fs.createReadStream(path.join(__dirname, './assets/cpUses.png')),
        },
    ];

    const options = {
        to: 'shuvoh38@gmail.com',
        cc: 'partho.ipe.12@gmail.com, s.haldar.ipe@gmail.com',
        replyTo: 'shuvoh38@gmail.com',
        subject: 'Hello From Node JS through Gmail API 🚀',
        text: 'This email is sent from the command line to test for developing purpuse',
        html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://shuvohaldar.com">Shuvo Haldar</a>.</p>`,
        attachments: fileAttachments,
        textEncoding: 'base64',
        headers: [
          { key: 'X-Application-Developer', value: 'Amit Agarwal' },
          { key: 'X-Application-Version', value: 'v1.0.0.2' },
        ],
    };

    const messageId = await sendMail(options,refCurrentTokens);
    return messageId;

}


app.get('/', (req, res) => {
    // insted to send the url response, use puppeteer to get the access tokens
    console.log("Got redirect on home path  -->>>>");
  res.send('Hello World! got redirect response')
})

console.log(process.env.GAMIL_API_CLIENT_ID);
console.log(process.env.GMAIL_API_CLIENT_SECRET);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})