const express = require("express");
const app = express();
app.use(express.json());

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  try {
    const { num1, num2, symbol } = req.body;
    let calculated;

    if (symbol === "+") {
      calculated = num1 + num2;
    }
    if (symbol === "-") {
      calculated = num1 - num2;
    }
    if (symbol === "X") {
      calculated = num1 * num2;
    }
    if (symbol === "/") {
      calculated = num1 / num2;
    }

    res.status(200).json(calculated.toString());
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = app;
