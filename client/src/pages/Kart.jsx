import React, { useState, useEffect } from "react";
import Meteors from "../components/magicui/meteors.tsx";
import KartItem from "../components/KartItem.jsx";
import img from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import del from "../assets/icons/del.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
      toast.success("Product delete from cart");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const makeReadableTime = (isoTime, date) => {
    const time = new Date(isoTime);
    // Convert the time to a readable format
    if (date === true) {
      const readableTime = time.toLocaleDateString("en-UK", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return readableTime;
    } else {
      const readableTime = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return readableTime;
    }
  };

  // Function to calculate total
  const total = subTotal; // For now, total is same as subtotal

  return (
    <div className="py-8 relative flex flex-col items-center min-h-[100vh]">
      <div className="select-none mb-8">
        <div className="text-3xl font-mentra text-center">Kart</div>
        <div className="text-center">
          <div className="text-center ">&#8377; {total}.00</div>
          <div>{cartItems.length} Relics rest within thy satchel </div>
          <div className="flex justify-center">
            <button
              className="px-8 py-1 border border-black text-center bg-white rounded-sm  hover:invert transition-all"
              onClick={() => {
                window.scrollTo({
                  top: 640,
                  behavior: "smooth",
                });
                navigate("/billingPage");
              }}
            >
              Proceed to Offering
            </button>
          </div>
        </div>
        <Meteors />
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="relative grid grid-cols-1   justify-center mx-2 lg:mx-8 py-4 gap-4 ">
            {cartItems.map((item) => (
              <div
                onClick={() => console.log(item)}
                key={item?.productId}
                className="flex border rounded-xl w-full overflow-hidden relative bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <img
                  className="w-[40%] md:w-[20%]"
                  src={item?.productDetails?.photos}
                  alt=""
                />
                <div
                  className="flex flex-col p-2"
                  title={`${item?.productDetails?.companymodel} | ${item?.productDetails?.brand} | ${item?.productDetails?.colorway}`}
                >
                  <h1 className="font-bold cursor-pointer hover:underline line-clamp-2">
                    {item?.productDetails?.companymodel} |{" "}
                    {item?.productDetails?.brand} |{" "}
                    {item?.productDetails?.colorway}
                  </h1>
                  <h2 className="font-medium ">
                    &#8377; {item?.productDetails?.price}
                  </h2>
                  <h3 className="font-thin mt-4 text-xs">
                    Enscribed Upon :{" "}
                    {makeReadableTime(item?.productDetails?.createdAt, true)}
                  </h3>
                  <div
                    className="flex absolute right-2 bottom-2 bg-black text-white rounded px-2 py-1 invert cursor-pointer"
                    onClick={() => handleDelete(item?.productId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 hover:fill-current cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between py-3 px-2 md:px-8">
            <div className="w-full text-center">Thy satchel holdeth naught</div>
          </div>
        </>
      )}
      <div>
        <div className="text-center mt-4 py-1">&#8377; {total}.00</div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 border border-black text-center bg-white rounded  hover:invert transition-all"
            onClick={() => {
              window.scrollTo({ top: 640, behavior: "smooth" });
              navigate("/billingPage");
            }}
          >
            Tread the Path of Offering
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Catalogue;
