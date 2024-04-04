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
      nftAddress: {
        type: DataTypes.STRING,
        allowNull: false
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
      },
      blockNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'block_number'
      },
      nftOwnerId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nft_owner_id'
      },
      nftName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nft_name'
      },
      nftTokenUri: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nft_token_uri'
      }
  }, {
    tableName: 'orders',
    timestamps: false
  });
};