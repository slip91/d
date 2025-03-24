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
  to: `d@it-dk.com`, /// d@it-dk.com slip912@gmail.com
  subject: "Hi Sir!2",
  text: "Text if the HTML dont load2",
  html: content,
  attachments: [
    {
      filename: 'logo_pink_white.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\logo_pink_white.png',
      cid: 'logo_pink_white' //same cid value as in the html img src
    },
    {
      filename: 'top.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\top.png',
      cid: 'top' //same cid value as in the html img src
    },
    {
      filename: 'top_short.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\top_short.png',
      cid: 'top_short3' //same cid value as in the html img src
    },
    {
      filename: 'phone.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\phone.png',
      cid: 'phone' //same cid value as in the html img src
    },
    {
      filename: 'notification_container_email.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\notification_container_email.png',
      cid: 'notification_container_email' //same cid value as in the html img src
    },
    {
      filename: 'rotated_background.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\rotated_background.png',
      cid: 'rotated_background' //same cid value as in the html img src
    },
    {
      filename: 'noti_block.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\noti_block.png',
      cid: 'noti_block2' //same cid value as in the html img src
    },
    {
      filename: 'unilab.png',
      path: 'C:\\Users\\user\\WebstormProjects\\denis\\img\\unilab.png',
      cid: 'unilab' //same cid value as in the html img src
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
