var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');
const { body, validationResult, check } = require('express-validator');
const flash = require('connect-flash');
router.use(flash());



//render landing page
router.get('/', (req, res)=>{
    const success = req.flash('success')[0];
    
    res.render('index3', {
        success
    })
})

router.post(
    '/contact',
    [
        // Validation rules
        body('fname').trim().notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Valid email is required.'),
        body('phone').notEmpty().withMessage('Valid Phone number is required.'),
        body('services').trim().notEmpty().withMessage('Subject is required.'),
        body('messageTxt').trim().notEmpty().withMessage('Message cannot be empty.')
    ],
    async (req, res) => {
        // Extract validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('success', errors.array().map(err => err.msg));
            console.log(errors)
            return res.redirect('/'); // Reload the contact page with errors
        }

        // Extract data from the request body
        const { fname, email, phone, subject, services, messageTxt } = req.body;

        try {
            // Set up the Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Example: use 'gmail' or your preferred email provider
                auth: {
                    user: 'webmailservices001@gmail.com', // Replace with your email
                    pass: 'jiavpmqyfoauqbvw'  // Replace with your app-specific password
                }
            });

            // Set up the email options
            const mailOptions = {
                from: email, // Sender's email address
                to: 'victormutua71@gmail.com,', // receivers email address
                subject: `New Enquiry: ${services}`, // Email subject
                text: `You have received a new enquiry from:
                
                Name: ${fname}
                Phone: ${phone}
                Email: ${email} ← click to reply
                Subject: ${subject}
                Service chosen: ${services}
                
                Message:
                ${messageTxt}`
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            req.flash('success', 'Your enquiry has been sent successfully.');
            res.redirect('/'); // Redirect back to contact page with success message
        } catch (error) {
            console.error('Error sending email:', error);
            req.flash('success', 'There was an error sending your message. Please try again later.');
            res.redirect('/'); // Reload with error message
        }
    }
);



module.exports = router;