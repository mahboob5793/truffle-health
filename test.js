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

const request = require("supertest");

describe("Medical Bill Upload Service", () => {
  describe("GET /items", () => {
    it("returns a list of medical bills", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /items", () => {
    it("creates a new medical bill", async () => {
      const bill = {
        patientName: "John Doe",
        patientAddress: "123 Main St",
        hospitalName: "ABC Hospital",
        dateOfService: "2023-02-12",
        billAmount: 100.0
      };
      const res = await request(app)
        .post("/items")
        .send(bill);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(bill);
    });
  });
});