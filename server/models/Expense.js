import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExpanseSchema = new Schema({
  title: {
    type: String,
  },
  amount: {
    type: String,
  },
  category: {
    type: String,
  },
  incurredOn: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
    timestamps: true
});


const Expense = mongoose.model('expense', ExpanseSchema);
export default Expense;