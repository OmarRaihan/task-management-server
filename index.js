const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());

// Root API
app.get("/", (req, res) => {
  res.send("Hello Envy Task");
});

app.listen("/", (req, res) => {
  console.log(`Envy Task listening on port ${port}`);
});
