"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const {join} = require("node:path");
// HTML контент письма
const content = fs.readFileSync('email.html','utf8');

const TEST_EMAIL = "Fannnyyy@yandex.ru";
const TEST_PASSWORD = "alnymcytgnnqwuhu";
const CLIENT = "mailtodelivery@example.com";

const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: TEST_EMAIL,
    pass: TEST_PASSWORD,
  }
});

const message = {
  from: 'Fannnyyy@yandex.ru',
  to: `slip912@gmail.com`, /// d@it-dk.com slip912@gmail.com
  subject: "test",
  text: "test",
  html: content,
  attachments: [
    {
      filename: 'logopinkwhite.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\logopinkwhite.png',
      cid: 'logopinkwhite', //same cid value as in the html img src
      contentType: "image/png"
    },
    {
      filename: 'topshort.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\topshort.png',
      cid: 'topshort3',//same cid value as in the html img src
      contentType: "image/png"
    },
    {
      filename: 'phone.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\phone.png',
      cid: 'phone', //same cid value as in the html img src
      contentType: "image/png"
    },
    {
      filename: 'notiblock.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\notiblock.png',
      cid: 'notiblock', //same cid value as in the html img src
      contentType: "image/png"
    },
    {
      filename: 'unilab.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\unilab.png',
      cid: 'unilab', //same cid value as in the html img src
      contentType: "image/png"
    }
  ]
};

transporter.sendMail(message, (error, info) => {
  if (error) {
    return console.log('Ошибка', error);
  } else {
    console.log('Сообщение отправлено: %s', info.messageId);
  }
});
