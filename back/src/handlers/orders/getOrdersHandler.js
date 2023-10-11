const { getOrders, getUserOrders } = require("../../controllers/orders/getOrders");

const getOrdersHandler = async (req, res) => {
  const response = await getOrders();
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUserOrdersHandler = async (req, res) => {
  const { username } = req.query; // o por params quizás, el front podría decidir/manejar esto

  const response = await getUserOrders({ username });
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getOrdersHandler, getUserOrdersHandler };
