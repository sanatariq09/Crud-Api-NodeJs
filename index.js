import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";

const app = express();

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server — updated!");
});

// Connect to MongoDB and start server
mongoose
  .connect(
    "mongodb+srv://sanatarique17:Karachi%40123@backenddb.8atvt8z.mongodb.net/Node-API?appName=BackendDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Connection error:", err));
