import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductModal from "../components/ProductModal";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { profile } = useAuth();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [subTotalx, setSubTotalx] = useState(0);
  const [wishListItems, setWishListItems] = useState([]);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const swiperRef = useRef(null);
  const [swiperKey, setSwiperKey] = useState(0);

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
        setSubTotal(calculateSubTotal(response.data.products));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

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
          setSubTotalx(calculateSubTotal(response.data.products));
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchWishListItems();
    }
  }, [userId]);

  const calculateSubTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      if (item.productDetails) {
        total += item.productDetails.price;
      }
    });
    return total;
  };
  useEffect(() => {
    if (swiperRef.current) {
      setTimeout(() => {
        swiperRef.current?.autoplay?.start();
      }, 100); // Wait a bit to ensure it's initialized
    }
  }, [wishListItems, cartItems]);
  //   useEffect(() => {
  //     if (swiperRef.current) {
  //       if (showModal) {
  //         swiperRef.current.autoplay?.stop();
  //       } else {
  //         swiperRef.current.autoplay?.start();
  //       }
  //     }
  //   }, [showModal]);
  useEffect(() => {
    // Delay to allow layout/render to stabilize
    setTimeout(() => {
      setSwiperKey(Date.now());
    }, 100);
  }, []);

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      const auth = JSON.parse(localStorage.getItem("auth"));
      const userId = auth?.user?._id;

      if (!userId) {
        toast.error("User not found");
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/profile-pic`,
          {
            userId,
            base64Image,
          }
        );

        if (res.status === 200 && res.data.user) {
          toast.success("Profile picture updated!");

          // ✅ Update auth in localStorage
          const updatedUser = res.data.user;
          localStorage.setItem(
            "auth",
            JSON.stringify({ ...auth, user: updatedUser })
          );

          // Optional: force a re-render if needed
          window.location.reload(); // or trigger a rerender some other way
        } else {
          toast.error("Update failed");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Upload failed");
      }
    };

    reader.readAsDataURL(file); // Convert image to base64
  };

  const ensureBase64Prefix = (imgStr) => {
    console.log(profile.photoURL);
    if (!imgStr.startsWith("https://lh3.googleusercontent")) {
      return `data:image/jpeg;base64,${imgStr}`;
    }
    return imgStr;
  };

  return (
    <div className="flex flex-col items-center lg:py-8 select-none lg:h-[100vh] font-poppins">
      <div className="flex flex-col px-4 py-5 w-full items-center justify-center gap-5 my-8">
        <div className="flex items-center rounded-2xl py-6 mx-4 w-full flex-col lg:flex-row gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col justify-center items-center relative lg:w-1/3   ">
            <div className="flex">
              {profile?.photoURL ? (
                <div className="flex overflow-hidden rounded-full lg:h-60 lg:w-60 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <img
                    className="w-32 h-32 lg:h-full lg:w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                    src={profile.photoURL}
                    referrerPolicy="no-referrer"
                    alt="profile pic"
                  />
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-32 h-32 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              <label className="flex cursor-pointer overflow-hidden rounded-full bg-white p-1 absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)] left-[75%] top-[85%] lg:left-[65%] lg:top-[90%]  ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </label>
            </div>
          </div>
          <div className="flex flex-col lg:w-2/3">
            <div className="font-light text-2xl lg:text-4xl font-mentra mt-4 px-6 rounded text-center w-full underline">
              {profile.name}
            </div>
            <div className="flex items-center gap-2 justify-start px-6 rounded text-start w-full text-sm mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>

              {profile.email}
            </div>
            <div className="flex items-center gap-2 justify-start text-sm font- leading-4 py-2 px-6 rounded text-start w-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 lg:size-4"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <h1>221B Baker's st, behind ashina castle, Lands between</h1>
            </div>
            <div className="flex w-full flex-col lg:flex-row">
              <div className="flex rounded-xl gap-2 flex-col w-[91%] lg:w-[50%] my-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-4 px-6 py-2">
                <div className="flex justify-between w-full">
                  <div className="font-semibold text-nowrap">
                    Relics in thy Satchel :
                  </div>
                  <div className="font-mentra"> {cartItems.length}</div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="font-semibold text-nowrap">Worth :</div>
                  <div className="font-mentra">&#8377; {subTotal}</div>
                </div>
              </div>
              <div className="flex rounded-xl gap-2 flex-col w-[91%] lg:w-[50%]  my-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-4 px-6 py-2">
                <div className="flex justify-between w-full">
                  <div className="font-semibold text-nowrap">
                    Relics thy Yearn for :
                  </div>
                  <div className="font-mentra"> {wishListItems.length}</div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="font-semibold text-nowrap">Worth :</div>
                  <div className="font-mentra">&#8377; {subTotalx}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex rounded-2xl py-6 px-4 mx-4 w-full flex-col lg:flex-row gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col px-4 py-4 rounded-xl lg:w-1/3">
            <h1 className="font-mentra">Wishlist</h1>
            <div className="flex w-full">
              <Swiper
                key={swiperKey}
                slidesPerView={1}
                modules={[Navigation, Autoplay, Pagination]}
                parallax={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.autoplay?.start(); // Start autoplay forcefully
                }}
                className="w-full  h-48"
              >
                {wishListItems
                  .filter(
                    (wishListItem) =>
                      Array.isArray(wishListItem?.productDetails?.photos) &&
                      wishListItem.productDetails.photos.length > 0
                  )
                  .map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="overflow-hidden w-full h-full rounded-xl">
                        <img
                          src={img.productDetails.photos?.[0]}
                          alt={`${img.productDetails.brand} ${img.productDetails.companymodel}`}
                          className="w-full h-full object-cover object-top lg:object-center cursor-pointer"
                          onClick={() => {
                            setSelectedProductId(img.productId);
                            setShowModal(true);
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col px-4 py-4 rounded-xl lg:w-1/3">
            <h1 className="font-mentra">Kart</h1>
            <div className="flex w-full">
              <Swiper
                key={swiperKey}
                slidesPerView={1}
                modules={[Navigation, Autoplay, Pagination]}
                parallax={true}
                observer={true}
                observeParents={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.autoplay?.start(); // Start autoplay forcefully
                }}
                className="w-full  h-48"
              >
                {cartItems
                  .filter(
                    (cartItems) =>
                      Array.isArray(cartItems?.productDetails?.photos) &&
                      cartItems.productDetails.photos.length > 0
                  )
                  .map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="overflow-hidden w-full h-full rounded-xl">
                        <img
                          src={img.productDetails.photos?.[0]}
                          alt={`${img.productDetails.brand} ${img.productDetails.companymodel}`}
                          className="w-full h-full object-cover object-top lg:object-center cursor-pointer"
                          onClick={() => {
                            setSelectedProductId(img.productId);
                            setShowModal(true);
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className=" text-nowrap mx-6 lg:w-1/3">
            <h1 className="font-semibold text-xl md:text-2xl lg:mb-2  text-center lg:text-start">
              Edicts
            </h1>
            <ul className="md:text-base flex flex-col lg:gap-1 w-full lg:my-16 justify-center items-center">
              <NavLink
                onClick={() =>
                  window.scrollTo({ top: 500, behavior: "smooth" })
                }
                to={"/privacy-policy"}
                className="cursor-pointer hover:underline"
              >
                Veil of Secrets
              </NavLink>
              <NavLink
                onClick={() =>
                  window.scrollTo({ top: 500, behavior: "smooth" })
                }
                to={"/terms-and-conditions"}
                className="cursor-pointer hover:underline"
              >
                Bindings of Accord
              </NavLink>
              <NavLink
                onClick={() =>
                  window.scrollTo({ top: 500, behavior: "smooth" })
                }
                to={"/returns-exchange"}
                className="cursor-pointer hover:underline"
              >
                Pact of Reclaiming
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      {showModal && (
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          productId={selectedProductId}
        />
      )}
    </div>
  );
};

export default SettingsPage;
