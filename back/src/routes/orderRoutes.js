const { Router } = require("express");
const { Order } = require("../db");
const orderRouter = Router();

orderRouter.get('/', async(req, res)=>{
try {
    const orders = await Order.findAll()
    res.json(orders)
} catch (error) {
    console.error(error)
}
})

module.exports = {orderRouter}