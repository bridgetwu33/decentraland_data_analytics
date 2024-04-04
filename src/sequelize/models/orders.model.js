const { DataTypes } = require('sequelize');

// We export a function that defines the model.
module.exports = (sequelize) => {
    sequelize.define("orders", {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      processDate: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'process_date'
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nftId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nft_id'
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'order_id'
      },
      updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'updated_at'
      }
  }, {
    tableName: 'orders',
    timestamps: false
  });
};