const { User, Book } = require("../../db")
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

const order = async(req, res) => {

  try {
  
  const { buyer, items, shippingInfo } = req.body

  for(const el of items){
    const book = await Book.findOne({where: {title: el.title}})
    el.image = book.image
  }

  console.log(items)

  const user = await User.findOne({ where: { userId: buyer } })

  if (!user) return res.status(400).send('No se encuentra el usuario en la base de datos')

  const info = await transporter.sendMail({
    from: 'stayfybooks@gmail.com',
    to: user.email,
    subject: "Order Confirmation",
    html: `
        <!DOCTYPE html>
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
            .table-container {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .table-container th, .table-container td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .table-container th {
              background-color: #f5f5f5;
            }
            .footer {
              text-align: center;
              color: #777;
              font-size: 12px;
              margin-top: 20px;
            }
          </style>
          <title>Order Confirmation</title>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            <div class="content">
              <h2>Thank you for your order!</h2>
              <p>Hello ${user.username},</p>
              <p>Your order has been confirmed. Below are the details of your purchase:</p>
              <table class="table-container">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td>${item.title}</td>
                      <td><img src="${item.image}" alt="${item.title}" width="50"></td>
                      <td>${item.unit_price}</td>
                      <td>${item.quantity}</td>
                      <td>${item.unit_price * item.quantity}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <p>Billing Address:</p>
              <ul>
                <li>Domicile: ${shippingInfo.address}</li>
                <li>City: ${shippingInfo.city}</li>
                <li>Country: ${shippingInfo.country}</li>
                <li>Postal Code: ${shippingInfo.postcode}</li>
              </ul>
              <p>Best regards,<br>The Stayfy Team</p>
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

module.exports = order