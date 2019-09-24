require("dotenv").config();
const API_KEY = process.env.MG_KEY;
const DOMAIN = process.env.MG_BASE_URL;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const data = {
  from: "Excited User <me@samples.mailgun.org>",
  to: "charles.pustejovsky@gmail.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!"
};

mailgun.messages().send(data, (error, body) => {
  if (error) throw error;
  console.log(body);
});
