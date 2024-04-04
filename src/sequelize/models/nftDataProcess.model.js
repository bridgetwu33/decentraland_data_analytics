const { DataTypes } = require('sequelize');

// We export a function that defines the model.
module.exports = (sequelize) => {
    sequelize.define("nftDataProcess", {
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
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdDate: {
        type: DataTypes.DATE,
        field: 'created_date'
      },
      last_update_date: {
        type: DataTypes.DATE,
      }
  }, {
    tableName: 'nft_data_process',
    timestamps: false
  });
};