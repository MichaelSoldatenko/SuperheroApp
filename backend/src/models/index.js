const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Superhero = sequelize.define("Superhero", {
  nickname: { type: DataTypes.STRING, allowNull: false },
  real_name: { type: DataTypes.STRING },
  origin_description: { type: DataTypes.TEXT },
  superpowers: { type: DataTypes.TEXT },
  catch_phrase: { type: DataTypes.TEXT },
});

const SuperheroImage = sequelize.define("SuperheroImage", {
  image_path: { type: DataTypes.STRING, allowNull: false },
});

Superhero.hasMany(SuperheroImage, { as: "images", onDelete: "CASCADE" });
SuperheroImage.belongsTo(Superhero);

module.exports = { sequelize, Superhero, SuperheroImage };
