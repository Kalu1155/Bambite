import React from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";

const Cart = () => {
  return (
    <>
      <CustomerNav />
      <TopBar />
      <div className="customer-home container ">
        <p>Hello worl this is cart</p>
      </div>
    </>
  );
};

export default Cart;
