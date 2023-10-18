const { Router } = require("express");
const { Order, User } = require("../db");
const {FRONT_URL} = require("../utils")
const mercadopago = require("mercadopago");
const mercadopagoRouter = Router();

mercadopago.configure({
	access_token: "TEST-3438943176977971-092618-c19e43df76010971777dd068e3dcd790-1492295682",
});

mercadopagoRouter.post('/create_preference', async (req, res) => {
	const { items } = req.body;

	const externalReferenceInfo = {
		items
	  };

	const encodedInfo = btoa(JSON.stringify(externalReferenceInfo));

	const preference = {
		items,
		back_urls: {
			success: `${FRONT_URL}/order-approved`
		},
		auto_return: 'approved',
		external_reference: encodedInfo
	};

	try {
		const response = await mercadopago.preferences.create(preference);
		res.json({ id: response.body.id });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error al crear preferencia');
	}
});

mercadopagoRouter.post('/create_order', async (req, res) => {

	try {
		const { merchantOrder, paymentId, products, spent, buyer } = req.body
		const validate = await Order.findOne({where: {merchantOrder}})
		if(validate) return res.status(400).send('Esta orden ya fue agregada')
		const order = await Order.create({ merchantOrder, paymentId, products, spent, buyer })
	    const user = await User.findOne({where: {userId: buyer}})
		await order.addUser(user)
		res.status(200).send('Orden creada con exito')
	} catch (error) {
		res.status(500).send(error)
	}

});

module.exports = { mercadopagoRouter }