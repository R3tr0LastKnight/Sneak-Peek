import React,{useState,useEffect} from "react";
import Meteors from "../components/magicui/meteors.tsx";
import img from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import KartIco from "../assets/icons/addToCart.png";
import { useAuth } from "../context/AuthContext.js";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
const Wishlist = () => {


  const [wishListItems, setWishListItems] = useState([]);
  const [kart, setKart] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const {profile}=useAuth();
  useEffect(()=>{

    if(profile){
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
  },[profile])
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
  const handleAdd = async (productId) => {
    if(profile){
   
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
          userId:userId,
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
    
    } catch (error) {
      console.error("Error adding cart item:", error);
    }
  }
  else{
    toast.success("Please login to continue")
  }
  };
  return (
    <div className="py-8 relative flex flex-col items-center min-h-[50vh]">
      <div className="select-none">
        <div className="text-3xl font-mentra">Wishlist</div>
        <Meteors />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center mx-8 py-4 gap-4 ">
      {wishListItems.map((item) =>
          item.productDetails ? (
      <div className="flex border rounded-xl w-full overflow-hidden relative bg-white " key={item.productId}>
      <img className="w-[40%] md:w-[20%]"   src={item.productDetails.photos}alt="" />
      <div className="flex flex-col p-2">
        <h1 className="font-bold cursor-pointer">                  {item.productDetails.companymodel} |{" "}
                  {item?.productDetails?.brand} |{" "}
                  {item?.productDetails?.colorway}</h1>
        <h2 className="font-medium ">&#8377; {item.productDetails.price}</h2>
        <h3 className="font-thin mt-4 text-xs">Added On : {makeReadableTime(item?.productDetails?.createdAt, true)}</h3>
        <div className="flex absolute right-2 bottom-2 bg-black text-white rounded px-2 py-1 invert cursor-pointer" onClick={ handleAdd(item.productId)}>
          <img className="invert" src={KartIco} alt="" />
        </div>
      </div>
    </div>
              ) : (
                <div
                  key={item.productId}
                  className="flex justify-between py-3 px-2 md:px-8"
                >
                  <div className="w-full text-center">
                    WishList is empty
                  </div>
                </div>
              )
            )}
      </div>
    </div>
  );
};

export default Wishlist;
