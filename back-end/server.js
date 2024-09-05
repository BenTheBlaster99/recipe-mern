const express = require("express");
const hostname = "127.0.0.1";
const PORT = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./routes/reciepieRoutes");
const userRoutes = require("./routes/userRoutes");

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(recipeRoutes);
app.use("/auth/", userRoutes);
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
  console.log("lisetning to port:", PORT);
});
