// services/emailService.js

import nodemailer from 'nodemailer';
import { logError, logInfo } from '../utils/logger.js';

export const sendOrderConfirmationEmail = async (email, orderId) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Confirmation de commande',
            text: `Votre commande avec l'ID ${orderId} a été reçue avec succès. Nous allons la traiter dans les plus brefs délais. Merci de votre achat !`,
        };

        const info = await transporter.sendMail(mailOptions);
        logInfo('Email de confirmation de commande envoyé avec succès :', info.response);
    } catch (error) {
        logError('Erreur lors de l\'envoi de l\'email de confirmation de commande :', error);
    }
};
