import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  pid: { type: String, required: true },
  amt: { type: Number, required: true },
  scd: { type: String },
  status: { type: String },
  rawResponse: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export { Transaction }
