const keys = require("../../config/keys");
const api_key = keys.MAILGUN_API_KEY;
const domain = "mail.estuaryapp.com";
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

//SAMPLE DATA
// const data = {
//   from: "Estuary Test <no-reply@estuaryapp.com>",
//   to: "charles.pustejovsky@gmail.com",
//   subject: "Howdy! (Test #3",
//   text: "What hath God wrought?",
// };

module.exports = async function (data) {
  try {
    return await mailgun.messages().send(data);
  } catch (error) {
    return error;
  }
};
