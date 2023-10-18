const { User } = require("../../db")
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "stayfybooks@gmail.com",
      pass: "lmlg nyse vzrc thuc",
    },
  });
 
const register = async(req, res)=> {

    try {

        const {email} = req.body

        const user = await User.findOne({where: {email}})

        if(!user) return res.status(400).send('No se encuentra el usuario en la base de datos')
        
        const info = await transporter.sendMail({
          from: 'stayfybooks@gmail.com',
          to: user.email,
          subject: "Welcome to Stayfy - Registration Successful",
          html: `
              <html>
                  <head>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              color: #333;
                          }
                          .container {
                              max-width: 600px;
                              margin: 0 auto;
                              padding: 20px;
                          }
                          .header {
                              background-color: #f5f5f5;
                              padding: 10px;
                              text-align: center;
                          }
                          .header h1 {
                              color: #333;
                          }
                          .content {
                              padding: 20px 0;
                          }
                          .footer {
                              text-align: center;
                              color: #777;
                              font-size: 12px;
                              margin-top: 20px;
                          }
                      </style>
                      <title>Welcome to Stayfy</title>
                  </head>
                  <body>
                      <div class="container">
                          <div class="header">
                              <h1>Welcome to Stayfy</h1>
                          </div>
                          <div class="content">
                              <p>Hello ${user.username},</p>
                              <p>Your registration at Stayfy has been completed successfully! We're excited to have you as part of our community.</p>
                              <p>Stayfy is your go-to platform for all things books. Explore our vast collection and start your reading journey today!</p>
                              <p>Best regards,<br>The Stayfy Team</p>
                          </div>
                          <div class="footer">
                              <p>This is an automated message. Please do not reply to this email.</p>
                          </div>
                      </div>
                  </body>
              </html>
          `
      });
          

          console.log(`Message sent: ${info.messageId}`)
        
          res.status(200).send(`Message sent: ${info.messageId}`);

    } catch (error) {
        res.status(500).send(error.message)
    }

  }

  module.exports = register