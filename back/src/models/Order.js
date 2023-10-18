const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "Order", {
            merchantOrder: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false
            },
            buyer: {
                type: DataTypes.INTEGER,
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
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {timestamps: true}
    )
}