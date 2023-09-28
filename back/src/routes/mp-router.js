const { Router } = require("express");
const mercadopago = require("mercadopago")
const mercadopagoRouter = Router();

mercadopago.configure({
	access_token: "TEST-3438943176977971-092618-c19e43df76010971777dd068e3dcd790-1492295682",
});

mercadopagoRouter.post('/create_preference', async (req, res) => {
	const { items } = req.body;
  
	const preference = {
	  items,
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
	res.send('Aca va lo que vamos a poner en un pago exitoso')
	// res.json({
	// 	Payment: req.query.payment_id,
	// 	Status: req.query.status,
	// 	MerchantOrder: req.query.merchant_order_id
	// });
});

module.exports = {mercadopagoRouter}