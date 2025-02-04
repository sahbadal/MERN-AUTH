import nodeMailer from 'nodemailer';
import { SMTP_USER, SMTP_PASSWORD } from './envConfig.js';

const transporter = nodeMailer.createTransport({
    host:'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

export default transporter;