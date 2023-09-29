const { Router } = require("express");
const { Order } = require("../db");
const mercadopago = require("mercadopago");
const mercadopagoRouter = Router();

mercadopago.configure({
	access_token: "TEST-3438943176977971-092618-c19e43df76010971777dd068e3dcd790-1492295682",
});

mercadopagoRouter.post('/create_preference', async (req, res) => {
	const { items, image } = req.body;

	const {title, quantity, unit_price} = items[0]

	const preference = {
	  items,
	  back_urls: {
		success: `http://localhost:5173/order-approved/?title=${title}&quantity=${quantity}&unit_price=${unit_price}&image=${image}`
	  },
	  auto_return: 'approved'
	};
  
	try {
	  const response = await mercadopago.preferences.create(preference);
	  res.json({ id: response.body.id });
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error al crear preferencia');
	}
  });

mercadopagoRouter.get('/feedback', function (req, res) {
	res.json({
	Payment: req.query.payment_id,
	Status: req.query.status,
	MerchantOrder: req.query.merchant_order_id
    });
});

module.exports = {mercadopagoRouter}