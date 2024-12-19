const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RegistrationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'Users',
        timestamps: false, // Disable createdAt/updatedAt
    });

    return User;
};
