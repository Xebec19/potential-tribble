import * as de from 'dotenv';

const dotenv = de.config();
if (dotenv.error) {
  console.error('Error occurred while setting dot env files : ', dotenv.error);
}
export const dbUser = process.env.DB_USER;
export const dbHost = process.env.DB_HOST;
export const dbDatabase = process.env.DB_DATABASE;
export const dbPort = process.env.DB_PORT;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
export const senderEmail = process.env.SENDER_EMAIL;
export const accountSid = process.env.TWILIO_ACCOUNT_SID;
export const authToken = process.env.TWILIO_AUTH_TOKEN;
export const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
export const algoliaAppId = process.env.ALGOLIA_APP_ID;
export const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY;
export const algoliaIndex = process.env.ALGOLIA_INDEX;
