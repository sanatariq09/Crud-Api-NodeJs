import Product from "../models/product.model.js";

export async function getProducts (req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json(products); // send success response
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export async function getProduct (req, res) {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products); // send success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function createProduct (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); //send success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function updateProduct (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id);
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function deleteProduct (req, res) {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: error.message });
  }
};


