const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let bills = [];

// Route to get all medical bills
app.get("/items", (req, res) => {
  res.status(200).json(bills);
});

// Route to create a new medical bill
app.post("/items", (req, res) => {
  let bill = req.body;
  bills.push(bill);
  res.status(201).json(bill);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Medical bill upload service listening at http://localhost:${port}`);
});
