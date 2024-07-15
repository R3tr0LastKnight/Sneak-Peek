import React, { useState, useEffect } from "react";
import Meteors from "../components/magicui/meteors.tsx";
import img from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import KartIco from "../assets/icons/addToCart.png";
import { useAuth } from "../context/AuthContext.js";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
const Wishlist = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [kart, setKart] = useState([]);
  const [hover, setHover] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      const userId = auth.user._id;
      const fetchWishListItems = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayWishListProduct`,
            {
              params: { userId },
            }
          );
          setWishListItems(response.data.products);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchWishListItems();
    }
  }, [profile]);
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
  console.log("wish", wishListItems);
  const handleAdd = async (productId) => {
    if (profile) {
      try {
        const productToAdd = {
          productId: productId,
          size: "12",
        };
        const userId = auth.user._id;
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/addtoCart`,
          {
            products: [productToAdd],
            userId: userId,
          }
        );
        setKart((prevKart) => [...prevKart, productId]);
        toast.info(`Product added to cart`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        handleDeleteWishList(productId);
      } catch (error) {
        console.error("Error adding cart item:", error);
      }
    } else {
      toast.success("Please login to continue");
    }
  };

  const handleDeleteWishList = async (productId) => {
    try {
      const userId = auth.user._id;
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/deleteWishListProduct`,
        {
          data: { userId, productId },
        }
      );
      setWishListItems((prevWish) =>
        prevWish.filter((item) => item.productId !== productId)
      );
      // setWish(setWish.filter((item) => item.productId !== productId));
      toast.info(`Product removed from WishList`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="py-8 relative flex flex-col items-center min-h-[50vh]">
      <div className="select-none">
        <div className="text-3xl font-mentra">Wishlist</div>
        <Meteors />
      </div>
      {wishListItems?.length > 0 ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center mx-8 py-4 gap-4 ">
          <>
            {wishListItems.map((item) => (
              <div
                className="flex border rounded-xl w-full overflow-hidden relative bg-white "
                key={item.productId}
              >
                <img
                  className="w-[40%] md:w-[20%]"
                  src={item?.productDetails?.photos}
                  alt=""
                />
                <div className="flex flex-col p-2">
                  <h1 className="font-bold cursor-pointer">
                    {" "}
                    {item?.productDetails?.companymodel} |{" "}
                    {item?.productDetails?.brand} |{" "}
                    {item?.productDetails?.colorway}
                  </h1>
                  <h2 className="font-medium ">
                    &#8377; {item?.productDetails?.price}
                  </h2>
                  <h3 className="font-thin mt-4 text-xs">
                    Added On :{" "}
                    {makeReadableTime(item?.productDetails?.createdAt, true)}
                  </h3>
                  <div className="flex absolute right-2 bottom-2 bg-black text-white rounded px-2 py-1 invert  gap-4">
                    <svg
                      onClick={() => {
                        handleAdd(item?.productId);
                      }}
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
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

                    <svg
                      onClick={() => {
                        handleDeleteWishList(item?.productId);
                      }}
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
          </>{" "}
        </div>
      ) : (
        <div className="flex justify-center items-center py-3 mt-16 px-2 md:px-8 text-center w-full ">
          <div className="w-full text-center">WishList is empty</div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
