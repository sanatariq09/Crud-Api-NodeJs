import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import "./ProductList.css";
import Slider from "react-slick";

const sliderImages = [
  "https://th.bing.com/th/id/R.6169941f0767cc026471cbfda82e1174?rik=ZQsX2jBKlJVBxg&pid=ImgRaw&r=0",
  "https://descriptive.audio/wp-content/uploads/2024/03/AirPods-Generation.jpg",
  "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/2023/05/apple-airpods-versus-1.jpg",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editError, setEditError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch products error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting product");
    }
  };

  const openEditor = (id) => {
    console.log("Edit clicked for id:", id);
    setEditError(null);
    setEditingId(id);
  };

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="container my-4">
      {/* Slider */}
      <div className="mb-4 slider-container">
        <Slider {...settings}>
          {sliderImages.map((img, i) => (
            <div key={i}>
              <img src={img} alt={`Slide ${i}`} className="slider-img" />
            </div>
          ))}
        </Slider>
      </div>
      <h3 className="text-center mb-4">All Products</h3>
      {/* Products */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card product-card h-100 shadow-sm">
              {p.image && (
                <img
                  src={`http://localhost:4000${p.image}`}
                  className="card-img-top product-img"
                  alt={p.name}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text mb-3">
                  <strong>Price:</strong> ${p.price} <br />
                  <strong>Quantity:</strong> {p.quantity}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  {/* IMPORTANT: type="button" so it won't submit any outer form */}
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => openEditor(p._id)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p._1d ?? p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div
          className="modal-overlay"
          onClick={() => setEditingId(null)}
        >
          <div className="modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card p-3">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Edit Product</h5>
                <button className="btn-close" onClick={() => setEditingId(null)} />
              </div>

              <div className="modal-body">
                {/* show error if EditProduct crashes */}
                {editError ? (
                  <div className="alert alert-danger">Error loading editor: {editError}</div>
                ) : (
                  <EditProduct
                    productId={editingId}
                    onClose={() => setEditingId(null)}
                    onUpdated={() => {
                      fetchProducts();
                      setEditingId(null);
                    }}
                    onError={(msg) => {
                      console.error("EditProduct error:", msg);
                      setEditError(msg || "Unknown error");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
