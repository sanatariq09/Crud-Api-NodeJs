import express from "express";
//import Product from '../models/product.model.js';

const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

// GET all products
router.get("/", getProducts);

// GET single product by ID
router.get("/:id", getProduct);

// CREATE new product
router.post("/", createProduct);

// UPDATE a product
router.put("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

export default router;
