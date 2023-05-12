const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./database/transaction");
require("dotenv").config();

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

mongoose.set("strictQuery", false);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let role = 2;
  switch (email) {
    case "admin@gmail.com":
      role = 0
      break;
    case "manager@gmail.com":
      role = 1;
      break;
    default:
      role = 2
      break;
  }

  return res.status(200).send({
    success: true,
    data: {
      email,
      password,
      role,
    }
  })
})

app.get("/transaction", async (req, res) => {
  const transaction = await Transaction.find();
  transaction.map((tx) => tx.id = tx._id.toString())
  return res.status(200).send({
    success: true,
    data: transaction
  })
})

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
  mongoose.connect("mongodb+srv://akmaldira:Akmaldira123@cluster0.10sju.mongodb.net/wastebank")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err))
})