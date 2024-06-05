import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { log } from 'console';

const OAuth2 = google.auth.OAuth2;
const OAUTH_LINK = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  OAUTH_LINK
);

// Using Nodemailer with Google APIs to send emails
const sendEmail = async (email: string, subject: string, html: string) => {
  auth.setCredentials({ refresh_token: MAILING_REFRESH });
  const accessToken = await auth.getAccessToken();

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: String(accessToken.token) as string,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: subject,
    html: html
  };

  transport.sendMail(mailOptions, (err, _) => {
    if (err) return err;
    console.log('Email sent to:', email);
  });
};

export default sendEmail;
