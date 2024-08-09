import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import { useState, useEffect } from "react";
import React from "react";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cart = useSelector((state) => state.cart);

  // calculate total amount
  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, currItem) => {
        return acc + currItem.price;
      }, 0)
    );
  }, [cart]);

  const uniqueCartItems = cart.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  console.log("Cart Items");
  console.log(cart);
  console.log("Unique Cart Items");
  console.log(uniqueCartItems);

  return (
    <div className="h-full max-w-6xl mx-auto px-4">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col w-full lg:w-7/12">
            {uniqueCartItems.map((item, index) => (
              <CartItem item={item} key={item.id} itemIndex={index} />
            ))}
          </div>

          <div className="flex flex-col mt-10 lg:mt-0 lg:ml-10 mb-10 lg:w-5/12 bg-white p-4 justify-between shadow-lg">
            <div className="flex flex-col py-10">
              <div className="text-green-600 uppercase text-lg md:text-xl font-bold">
                Your Cart
              </div>
              <div className="text-green-600 tracking-wide uppercase text-3xl md:text-[60px] font-bold">
                Summary
              </div>
              <p className="text-gray-700 mt-7 uppercase text-md md:text-lg font-bold">
                <span>Total Items: {cart.length}</span>
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-bold">
                Total Amount:
                <span className="text-gray-900 ml-2">${totalAmount}</span>
              </p>
              <button
                className="bg-green-600 w-full text-white font-semibold text-base md:text-lg p-2 rounded-lg mt-10
                  hover:bg-green-700 transition duration-300 ease-in"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full gap-3 mt-20">
          <h1 className="text-green-700 font-semibold text-2xl md:text-3xl">
            Cart Empty
          </h1>
          <Link to="/">
            <button
              className="bg-green-600 w-full px-5 text-white font-semibold text-base md:text-lg py-2 rounded-lg mt-5
                hover:bg-green-700 transition duration-300 ease-in"
            >
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
