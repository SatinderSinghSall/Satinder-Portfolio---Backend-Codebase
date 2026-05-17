const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    const data = await resend.emails.send({
      from: "Satinder Singh Sall <contact@satinderpoetry.com>",
      to,
      subject,
      html,
      reply_to: replyTo,
    });

    console.log("Email sent:", data);

    return data;
  } catch (error) {
    console.error("Resend Error:", error);

    throw error;
  }
};

module.exports = sendEmail;
