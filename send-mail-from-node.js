"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
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
  to: `"slip912@gmail.com`,
  subject: "Hi Sir!2",
  text: "Text if the HTML dont load2",
  html: content,
  attachments: [
    // {
    //   filename: 'logo_pink_white.svg',
    //   path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\logo_pink_white.svg',
    //   cid: 'logo_pink_white' //same cid value as in the html img src
    // },
    {
      filename: 'top.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\top.png',
      cid: 'top' //same cid value as in the html img src
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
