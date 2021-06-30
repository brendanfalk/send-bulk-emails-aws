# Send Bulk Emails Using AWS SES

I lost access to my college.harvard.edu email in May 2021. I used this script to email my contacts updating them of my new address.


## Set Up AWS SES

1. Set up an AWS account and go to the SES (Simple email Service) service in the console
2. Get approved for AWS SES production access (follow this guide https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html)
3. Verify your email address (and optionally domain) in AWS SES console
4. Create a new IAM access key as outlined here: https://betterprogramming.pub/how-to-send-emails-with-node-js-using-amazon-ses-8ae38f6312e4

<br/>

## Set Up Environment Variables

Create a `.env` file like the below and add your IAM access keys and region (from above)

```bash
ACCESS_KEY=
SECRET_ACCESS_KEY=
REGION=us-east-1
```   

<br/>

## Send Email
1. Customize your email in the top of `myEmail.js`. Your email body must be written in HTML/ 
```javascript
var your_name = "Brendan Falk";
var your_email = "brendan@gmail.com"; // this is the email you verified with AWS SES
var email_subject = "my witty subject";
var email_body = ` 
WRITE YOUR EMAIL IN HTML HERE
`;
```

**Note**: You can also do an a/b test by generating a random int...


2. Add your list of recipients emails as an array of objects `recipients.js`. Each recipient object must contain the `email` prop

```javascript
module.exports = [
  { email: "abc@gmail.com", name: "ABC DEF"}
  { email: "zyx@gmail.com", name: "ZYX WVU"}
];
```

3. When ready, run `npm run send_emails`

<br/>

### To do in future
- [ ] Replaces emails.js with a csv file
- [ ] Create an `npm test` script which sends you a test email
- [ ] Store message response somewhere (e.g. was email delivered, did it bounce...)
- [ ] Add unsubscribe link to bottom of emails

<br/>

### Other Potentially Helpful Resources:

* https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html



