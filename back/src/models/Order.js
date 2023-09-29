const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "Order", {
            merchantOrder: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            buyer: {
                type: DataTypes.STRING,
                allowNull: false
            },
            products: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            },
            spent: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            paymentId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {timestamps: false}
    )
}