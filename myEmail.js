module.exports = {
  my_name: "Brendan Falk", // The sender name
  my_email: "brendan@gmail.com", // the sender email - MUST be verified by AWS SES
  my_email_subject: "My Witty Subject", // your email's subject

  // Your email body. This is a function
  // We run this function on each recipient objects defined in recipients.js
  // It should output a string which is the final body of the email you're sending
  my_email_body_function: (recipientObject) => {
    var random_int = Math.floor(Math.random() * 2) + 1;

    var first_name = recipientObject.name.split(" ")[0];
    var dummy_url = "https://google.com";

    if (random_int == 1) {
      return `
    <html>
    <body>
    <p>Hi ${first_name},</p>
    
    <p>Brendan, co-founder of Fig here.</p>
    
    <p>We're working hard to improve Fig for all of our users. We'd love to understand what we can be doing better.</p>
    
    <p>Would you be open to taking this 1 minute survey to help?</p><br />
    
    <a style="font-size: 1.5em; font-weight: bold; color: #75aada;" href="${dummy_url}">Take 1-min Survey</a>
    
    <table style="font-size:16px" width="0" height="0" border="0" align="center" cellpadding="0" cellspacing="0"></table>
    <br />
    <p>Please let me know if you have any questions 😊 </p>
    
    <p>Brendan </p>
    </body>
    </html>
    
        `;
    } else if (random_int == 2) {
      return `

      <p>Hey ${first_name} - you should check out this <a style="font-size: 1.5em; font-weight: bold; color: #75aada;" href="${dummy_url}">this link</a></p>        
    `;
    }
  },
};
