import React, { useState, useEffect } from "react";
import Meteors from "../components/magicui/meteors.tsx";
import KartItem from "../components/KartItem.jsx";
import img from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import del from "../assets/icons/del.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Catalogue = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayCartProduct`,
          {
            params: { userId },
          }
        );
        setCartItems(response.data.products);

        // Calculate subtotal when cart items are fetched
        calculateSubTotal(response.data.products);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateSubTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      if (item.productDetails) {
        total += item.productDetails.price;
      }
    });
    setSubTotal(total);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/deleteCartProduct`,
        {
          data: { userId, productId },
        }
      );
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Function to calculate total
  const total = subTotal; // For now, total is same as subtotal
  return (
    <div className="py-8 relative flex flex-col items-center min-h-[50vh]">
      <div className="select-none">
        <div className="text-3xl font-mentra">Kart</div>
        <Meteors />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2  justify-center mx-8 py-4 gap-4 ">
        {cartItems.map((item) =>
          item.productDetails ? (
            <div
              key={item.productId}
              className="flex border rounded-xl w-full overflow-hidden relative bg-white "
            >
              <img
                className="w-[40%] md:w-[20%]"
                src={item.productDetails.photos}
                alt=""
              />
              <div className="flex flex-col p-2">
                <h1 className="font-bold cursor-pointer hover:underline">
                  {item.productDetails.companymodel}
                </h1>
                <h2 className="font-medium ">$ {item.productDetails.price}</h2>
                <h3 className="font-thin mt-4 text-xs">
                  Added On : 31st Feb 2024
                </h3>
                <div
                  className="flex absolute right-2 bottom-2 bg-black text-white rounded px-2 py-1 invert cursor-pointer"
                  onClick={() => handleDelete(item.productId)}
                >
                  <img className="invert" src={del} alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div
              key={item.productId}
              className="flex justify-between py-3 px-2 md:px-8"
            >
              <div className="w-full text-center">
                Product details not available
              </div>
            </div>
          )
        )}
      </div>
      <div className="text-center">Rs. {total}.00</div>
      <div className="flex justify-center">
        <button
          className="border border-black rounded p-2 "
          onClick={() => navigate("/billingPage")}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default Catalogue;
