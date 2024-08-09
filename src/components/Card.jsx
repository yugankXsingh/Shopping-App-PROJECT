import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add, remove, removeOne } from "../redux/Slices/CartSlice";

const Card = ({ product }) => {
  // const { cart } = useSelector((state) => state);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(add(product)); // add product to cart
    toast.success("Item added to cart");
  };

  const removeFromCartHandler = () => {
    dispatch(remove(product.id)); // remove by id --> no need to pass entire product
    toast.error("Item removed from cart");
  };

  const removeOneProductHandler = () => {
    // remove only one item of that id even if multiple items are present
    dispatch(removeOne(product.id));
    toast.error("Quantity reduced by 1");
  };

  const Quantity = cart.filter((p) => p.id === product.id).length;

  const isProductInCart = cart.some((p) => p.id === product.id);

  // trim down description upto 10 words
  const trimmedDescription =
    product.description.split(" ").slice(0, 10).join(" ") + "...";
  return (
    <div className="flex flex-col items-center justify-between gap-3 p-4 mt-10 ml-5 rounded-xl hover:scale-110 transition duration-300 ease-in custom-card-Shadow">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
          {product.title.slice(0, 14) + "..."}
        </p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {trimmedDescription}
        </p>
      </div>
      <div className="h-[180px]">
        <img className="h-full w-full" src={product.image} alt="product" />
      </div>
      <div className="flex justify-between w-10/12 mx-auto mt-5">
        <div>
          <p className="text-green-600 font-semibold">${product.price}</p>
        </div>
        {isProductInCart ? (
          <div>
            <button
              onClick={removeFromCartHandler}
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
            hover:bg-red-600 hover:text-white transition duration-300 ease-in"
            >
              Remove item
            </button>
          </div>
        ) : (
          <button
            onClick={addToCartHandler}
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
            hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            Add to cart
          </button>
        )}
      </div>
      {isProductInCart && (
        <div className="w-5/12 cursor-pointer flex justify-between rounded-md px-2 py-1 text-white bg-slate-900 borde mx-auto">
          <button
            onClick={removeOneProductHandler}
            className="border-r-2 pr-2 pl-2 hover:animate-pulse font-semibold transition duration-100 linear"
          >
            -
          </button>
          <span className="font-semibold">{Quantity}</span>
          <button
            onClick={addToCartHandler}
            className="border-l-2 pl-2 pr-2 font-semibold hover:animate-pulse transition duration-100 linear"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
