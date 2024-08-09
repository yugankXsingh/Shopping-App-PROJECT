import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { useState } from "react";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from cart");
  };

  const [readMore, setReadMore] = useState(false);

  const cart = useSelector((state) => state.cart);

  let Quantity = 0;
  cart.forEach((Item2) => {
    if (Item2.id === item.id) {
      Quantity++;
    }
  });

  return (
    <div className="flex justify-between items-center mt-10 py-10 border-b-2 px-4 mb-5 border-gray-500">
      <div className="h-[180px] w-[130px]">
        <img
          src={item.image}
          alt="cartItemImage"
          className="h-full w-full object-contain object-center"
        />
      </div>
      <div className="w-8/12 text-left flex flex-col gap-6">
        <h1 className="text-gray-700 font-semibold text-lg text-left">
          {item.title}
        </h1>
        <p className=" text-gray-600 font-normal text-[15px] text-left">
          {readMore
            ? item.description
            : item.description.split(" ").slice(0, 16).join(" ") + "..."}
          <span
            className="text-blue-400 ml-2 cursor-pointer"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Show Less" : "Read More"}
          </span>
        </p>
        <div className="flex justify-between w-11/12">
          <p className="text-green-600 font-semibold">${item.price}</p>
          <div
            onClick={removeFromCartHandler}
            className="h-[30px] w-[30px] rounded-full cursor-pointer bg-red-300 flex justify-center items-center"
          >
            <MdDelete className="text-red-600 cursor-pointer" />
          </div>
        </div>
        <div>
          <p className="text-gray-600 font-semibold text-sm">
            Quantity: {Quantity}
          </p>
          <p className="text-gray-600 font-semibold text-sm">
            Total for this item :
            <span className="text-green-600 font-semibold text-sm ml-1">
              ${Quantity * item.price}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
