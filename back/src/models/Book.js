const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        initialValue: 1001,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      authors: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pageCount: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "db",
      },
    },
    {
      timestamps: false,
    }
  );
};
