const keys = require("../../config/keys");
const api_key = keys.MAILGUN_API_KEY;
const domain = "mail.estuaryapp.com";
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

module.exports = async function (data) {
  try {
    return await mailgun.messages().send(data);
  } catch (error) {
    return error;
  }
};
