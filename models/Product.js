const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        ProductId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ProductName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ManufacturingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'Products',
        timestamps: false,
    });

    return Product;
};
