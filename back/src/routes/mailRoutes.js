const {Router} = require("express")
const register = require("../controllers/mail/register");
const  order  = require("../controllers/mail/order");
const mailRouter = Router()

  mailRouter.post('/register', register)
  
  mailRouter.post('/order_approved', order)

module.exports = {mailRouter}