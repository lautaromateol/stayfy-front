const {User} = require("../../db")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
    const {email} = req.body

    const check = await User.findOne({where: {email}})
    if(!check){
        return res.send({Status: "User doesnt exist"})
    }
    const token = jwt.sign({id: User.userId}, "passwordSecret")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });
      
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Reset Password',
        text: `http://localhost:5173/forgot-password/${User.userId}/${token}`
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