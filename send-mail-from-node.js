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
  subject: "fix version 8",
  text: "test",
  html: content,
};

transporter.sendMail(message, (error, info) => {
  if (error) {
    return console.log('Ошибка', error);
  } else {
    console.log('Сообщение отправлено: %s', info.messageId);
  }
});
