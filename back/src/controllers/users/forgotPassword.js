const {User} = require("../../db")
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
    const {email} = req.body

    const check = await User.findOne({where: {email}})
    if(!check){
        return res.send({Status: "User doesnt exist"})
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "stayfybooks@gmail.com",
          pass: 'lmlg nyse vzrc thuc'
        }
      });
      
      const mailOptions = {
        from: 'stayfybooks@gmail.com',
        to: check.email,
        subject: 'Reset Password',
        html: `
        <html>
  <head>
     <style>
        /* Style the anchor to look like a button */
        .button-link {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff; /* Change the background color to your preference */
            color: #fff; /* Change the text color to your preference */
            text-decoration: none;
            border: 1px solid #007bff; /* Add a border to make it look like a button */
            border-radius: 4px; /* Add rounded corners */
        }

        .button-link:hover {
            background-color: #0056b3; /* Change the background color on hover */
        }
      </style>
  </head>
  <body>
    <a class="button-link" href="http://localhost:5173/reset-password/${check.userId}">Reset Password</a>
  </body>
  </html
    `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.send({Status: "Success"})
        }
      });
}

module.exports = forgotPassword