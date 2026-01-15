const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { sequelize } = require("./models");
const superheroRoutes = require("./routes/superheroRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/superheroes", superheroRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection to MySQL successfully.");

    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

module.exports = app;
