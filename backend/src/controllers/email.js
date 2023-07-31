const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : 
         {
            user : process.env.User,
            pass : process.env.Password
        }
    
});

const sendWelcomeEmail = async (email) => {
    const message = "Thank you for subscribing to our website!\n\nWe are thrilled to have you on board. You will now receive updates, news, and special offers related to our book management project.\n\nIf you have any questions or need assistance, feel free to reach out to us.\n\nHappy reading!\n\n- The Book Management Team";

       const mailOption = {
      from: process.env.User,
      to: email,
      subject: "Welcome to Book Management Project",
      text: message,
    };
  
    try {
      const info = await transporter.sendMail(mailOption);
      console.log("Welcome message sent successfully!", info);
      return info; // Return the info if needed for further processing
    } catch (error) {
      console.log("Error sending the welcome message: ", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  
  const SendMail = async (req, res) => {
    try {
      const email = req.params.email
     
      console.log(email)
      await sendWelcomeEmail(email);
  
      return res.status(200).send({ message: "Welcome email sent successfully!" });
    } catch (err) {
      return res.status(500).send({ message: "Error sending the welcome email." });
    }
  };
  
  module.exports = { SendMail };
  


module.exports =  { SendMail }