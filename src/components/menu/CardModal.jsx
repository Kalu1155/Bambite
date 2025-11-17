import React, { useContext, useState, useEffect } from "react";
// import { CartContext } from "../../context/CartContext";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify"; 
import food from "../../assets/images/food_3.jpeg";

const user = null;

const CardModal = ({ show, onHide, dish }) => {
  const [quantity, setQuantity] = useState(1);
  // const { addToCart } = useContext(CartContext);
 const formatPrice = (price) => price.toLocaleString("en-NG");
  // Reset quantity whenever modal closes
  useEffect(() => {
    if (!show) setQuantity(1);
  }, [show]);

  const AddToCart = (dish) => {
    if (!dish) return;
    if (!user) {
      toast.info("Please log in to add items to your cart 🔐");
      return;
    }
   try {
      addToCart(dish, quantity);
      toast.success(`${quantity} × ${dish.name} added to cart ✅`);
      onHide(); // ✅ close modal after adding
    } catch (err) {
      console.error(err);
      toast.error("Could not add to cart ❌");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centere className="home-push" d>
      <Modal.Header closeButton>
        <Modal.Title>{dish?.name || "Dish Details"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              // {dish?.image ? `http://localhost:5000${dish.image}` : food}
              src={food}
              alt={dish?.name || "Food"}
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>

          {/* Info Section */}
          <div className="col-md-6">
            <h5 className="mt-3">
              <b>Description:</b>
            </h5>
            <p>{dish?.description || "No description available."}</p>

            <h5 className="my-3">
              <b>Price:</b>₦{formatPrice(dish.price)}
            </h5>

            <h5 className="my-3">
              <b>Category:</b>{" "}
              {dish?.category ? dish.category.join(", ") : "N/A"}
            </h5>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center mt-4">
              <b className="me-3">Quantity:</b>
              <div className="quantity mt-3">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  min="1"
                  max="100"
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="pri-btn"
         onClick={() => AddToCart(dish)}>
          Add {quantity} × {dish?.name || "Item"} to Cart
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
