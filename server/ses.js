require('dotenv').config();
const aws = require('aws-sdk');

const { AWS_KEY, AWS_SECRET, AWS_REGION } = process.env;

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
});

const sendingEmail = ses.sendEmail({
    Source: 'Funky Chicken <available.cappelletti@spicedling.email>',
    Destination: {
        ToAddresses: ['available.cappelletti@spicedling.email']
    },
    Message: {
        Body: {
            Text: {
                Data: "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up."
            }
        },
        Subject: {
            Data: "Your Application Has Been Accepted!"
        }
    }
}).promise().then(
    () => console.log('it worked!')
).catch(
    err => console.log(err)
);

module.exports = { sendingEmail };