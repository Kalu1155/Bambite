import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { RiDeleteBin6Line } from "react-icons/ri";
import cartDum from "../../assets/images/food_3.jpeg";
import {Link} from "react-router-dom"

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Jollof Rice Deluxe",
      restaurant: "Golden Spoon",
      price: 3500,
      qty: 1,
      image: cartDum,
    },
    {
      id: 2,
      name: "Chicken Pepper Soup",
      restaurant: "Mama Cass",
      price: 2800,
      qty: 2,
      image: cartDum,
    },
  ]);

  const formatMoney = (x) => x.toLocaleString("en-NG");

  // Increase qty
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Summary values
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = cart.length > 0 ? 1200 : 0;
  const vat = subtotal * 0.02;
  const total = subtotal + vat + deliveryFee;

  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="customer-home container cart-page">
        <div className="cart-title-row">
          <h2 className="page-title">Your Cart</h2>
          {cart.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {/* ======================= CART ITEMS ======================= */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <>
            
            <p className="empty-cart">Your cart is empty 😢</p>
            <section className="quick-actions empty-cart">
              <Link to="/history" className="action-btn">
               View history
              </Link>
            </section>
            </>
          ) : (
            cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="restaurant">{item.restaurant}</p>
                  <p className="price">₦{formatMoney(item.price)}</p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                <div className="right-actions">
                  <h4 className="item-total">
                    ₦{formatMoney(item.price * item.qty)}
                  </h4>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ======================= ORDER SUMMARY ======================= */}
        {cart.length > 0 && (
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{formatMoney(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>VAT (2%)</span>
              <span>₦{formatMoney(vat)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₦{formatMoney(deliveryFee)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₦{formatMoney(total)}</span>
            </div>

             <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
             </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
