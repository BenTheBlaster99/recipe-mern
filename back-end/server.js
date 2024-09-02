const express = require("express");
const hostname = "127.0.0.1";
const PORT = 3000;
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://recipieuser:recipiepwd@recipies.8avrz.mongodb.net/",
  {
    dbName: "recepies-db",
  }
);
const database = mongoose.connection;
database.once("open", () => {
  console.log("connected to MongoDb");
});
app.listen(PORT, hostname, () => {
  console.log("lisetning to port:",PORT);
});
