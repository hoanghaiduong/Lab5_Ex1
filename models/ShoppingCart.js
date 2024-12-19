const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ShoppingCart = sequelize.define('ShoppingCart', {
        CartId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserId',
            },
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'ProductId',
            },
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'ShoppingCarts',
        timestamps: false,
    });

    return ShoppingCart;
};
