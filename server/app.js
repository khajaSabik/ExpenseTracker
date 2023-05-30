import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Expense from "./models/Expense.js";
import cors from "cors"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '30mb'}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/data', async(req, res) => {
  try {
    const {title, amount, category, incurredOn, notes } = req.body;
    const newExpense = await Expense.create({
      title,
      amount,
      category,
      incurredOn,
      notes,
  });

    const savedExpense = await newExpense.save();
    console.log("savedExpense", savedExpense);
    res.status(201).json(savedExpense);
    // res.send('Hello World!2')
  }catch{
      res.status(500).json({message: "Something went wrong"})
  }
})

// SERVER SETUP
const port = 8000;
mongoose.connect(`mongodb+srv://sabikadmin:Admin12345@expense.2c8i9rs.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
        app.listen(port, () => {
        console.log(`This app listening on port ${port}`)
      })
    })
    .catch((err) => { console.log("err", err)} )