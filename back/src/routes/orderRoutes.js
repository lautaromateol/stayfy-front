const { Router } = require("express");
const { getOrdersHandler, getUserOrdersHandler } = require("../handlers/orders/getOrdersHandler");

const orderRouter = Router();

orderRouter.get("/", getOrdersHandler)
orderRouter.get("/user", getUserOrdersHandler)

module.exports = {orderRouter}


// const { Order } = require("../db");

// orderRouter.get('/', async(req, res)=>{
    // try {
        //     const orders = await Order.findAll()
        //     res.status(200).json(orders)
        // } catch (error) {
            //     console.error(error)
            // }
            // })