const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  email: String,
  type: [{ name: String, weight: Number }],
  cost: Number,
  date: { type: Date, default: Date.now },
})

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;