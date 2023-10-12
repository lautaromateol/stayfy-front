const { Order, User } = require('../../db.js');

const getOrders = async () => {
    const dbOrders = await Order.findAll();
    return dbOrders;
};

const getUserOrders = async (username) => {
    if (!username){
        throw new Error ("The orders cannot be shown due to an incorrect username")
    }else{
        const user = await User.findOne({ 
            where: { username } 
        });
        return user.Order;
    }
};

module.exports = { getOrders, getUserOrders }; 