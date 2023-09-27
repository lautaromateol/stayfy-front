const { Router } = require("express");
const mercadopago = require("mercadopago")
const paymentRouter = Router();

paymentRouter.post("/create_preference", (req, res) => {

	mercadopago.configure({
		access_token: "TEST-3438943176977971-092618-c19e43df76010971777dd068e3dcd790-1492295682",
	});
	

	let preference = {
		items: [
			{
				title: req.body.title,
				picture_url: req.body.url,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3001/checkout/feedback",
			"failure": "http://localhost:3001/checkout/feedback",
			"pending": "http://localhost:3001/checkout/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				response
			});
		}).catch(function (error) {
			console.log(error);
		});
});

paymentRouter.get('/feedback', function (req, res) {
	res.send('Aca va lo que vamos a poner en un pago exitoso')
	// res.json({
	// 	Payment: req.query.payment_id,
	// 	Status: req.query.status,
	// 	MerchantOrder: req.query.merchant_order_id
	// });
});

module.exports = {paymentRouter}