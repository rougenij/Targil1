const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

app.use(express.static(path.join(__dirname, "assets")));

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    res.status(404).send("<h1>Product not found</h1>");
  } else {
    res.json(product);
  }
});
app.get("/users", (req, res) => {
  const { age } = req.query;
  if (age) {
    const user = users.find((u) => u.age == age);
    if (!user) {
      res.status(404).send("<h1>User not found</h1>");
    } else {
      res.json(user);
    }
  } else {
    res.json(users);
  }
});

// 404 error handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
