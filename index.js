require("dotenv").config();

// ####################
// Variables to define
// ####################
var your_name = "Brendan Falk";
var your_email = "brendan@gmail.com"; // must be verified by AWS SES
var email_subject = "my_email_subject";
var email_body = `
WRITE YOUR EMAIL IN HTML HERE
`;

// Import emails
var emails = require("./emails");

// ####################
// END vaiables to degine
// ####################

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

// Configure the SDK with your access keys from IAM
const SES_CONFIG = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.ACCESS_KEY, // https://betterprogramming.pub/how-to-send-emails-with-node-js-using-amazon-ses-8ae38f6312e4
  secretAccessKey: process.env.SECRET_ACCESS_KEY, // https://betterprogramming.pub/how-to-send-emails-with-node-js-using-amazon-ses-8ae38f6312e4
  region: process.env.REGION,
};

// CREATE AWS SES VAR
const AWS_SES = new AWS.SES(SES_CONFIG);

// Emergency stop var
var STOP = false;

// Main func which loops over all email addresses and sends email above to them
//
var main = async () => {
  // Loop over all emails
  for (var i = 0; i < emails.length; i++) {
    console.log(i);

    // Send email
    sendEmail(emails[i])
      .then((res) => {})
      .catch((err) => {
        console.log("fail");
        console.log(emails[i]);
        console.log(err);
        STOP = true;
      });

    if (STOP) {
      console.log("STOPPED");
      break;
    }

    if (i % 12 === 0) {
      await sleep(1500); // wait 1.5 seconds
    }
  }
};

var sendEmail = async (recipientEmail) => {
  let params = {
    Source: `${your_name} <${your_email}>`,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [],
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: email_subject,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email_body,
        },
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
