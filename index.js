const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));

// Variables to store data
let temp = "initial temperature";
let perm = ["first", "second", "third"];

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET temp value
app.get("/api/temp", (req, res) => {
  res.json({ temp });
});

// SET temp value
app.post("/api/temp", (req, res) => {
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ error: "Value is required" });
  }
  temp = value;
  res.json({ temp });
});

// GET perm array
app.get("/api/perm", (req, res) => {
  res.json({ perm });
});

// ADD to perm array
app.post("/api/perm", (req, res) => {
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ error: "Value is required" });
  }
  perm.push(value);
  res.json({ perm });
});

// DELETE from perm array
app.delete("/api/perm/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= perm.length) {
    return res.status(400).json({ error: "Invalid index" });
  }
  perm.splice(index, 1);
  res.json({ perm });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
