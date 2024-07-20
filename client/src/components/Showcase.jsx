import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
const Showcase = () => {
  const [show1, setShow1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { profile } = useAuth();
  const auth = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/showCaseProduct`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching random products:', err);
      }
    };

    fetchRandomProducts();
  }, []);

  const handleImageClick = (index) => {
    const newProducts = [products[index], ...products.filter((_, i) => i !== index)];
    setProducts(newProducts);
  };
  
  const handleAdd = async (productId) => {
    if (profile) {
      try {
        const productToAdd = {
          productId: productId,
          size: "11",
        };
        const userId = auth.user._id;
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/addtoCart`,
          {
            products: [productToAdd],
            userId: userId,
          }
        );
        setCartItems((prevCartItems) => [
          ...prevCartItems,
          { productId: productId },
        ]);
        // setKart((prevKart) => [...prevKart, productId]);
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
        // window.location.reload();
      } catch (error) {
        console.error("Error adding cart item:", error);
      }
    } else {
      toast.success("Please login to continue");
    }
    console.log("add", cartItems);
  };

  return (
    <>
      {showModal && (
        <ProductModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="mx-8 lg:mx-16 mb-8 lg:my-8 rounded-xl overflow-hidden flex shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="w-[67.5%] relative text-white transition-all">
          <>
            {products.length > 0 && (
              <div
                onMouseOver={() => setShow1(true)}
                className={`absolute z-20 top-[55%] lg:top-1/2 left-2 lg:left-8 transition-all ${
                  show1 ? '' : 'opacity-0'
                }`}
              >
                <h1 className="font-bold opacity-100 text-sm lg:text-2xl">
                  {products[0].companymodel}
                </h1>
                <p className="w-1/2 hidden lg:flex">
                  {products[0].about}
                </p>
                <button
                  onClick={() => {
                    handleAdd(products[0]._id);
                  }}
                  className="border lg:my-6 border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-1 px-3 rounded hover:bg-white hover:text-black transition-all text-sm lg:text-lg"
                >
                  Buy now
                </button>
              </div>
            )}
          </>

          {products.length > 0 && (
            <img
              onMouseOver={() => setShow1(true)}
              onMouseOut={() => setShow1(false)}
              src={products[0].photos[0]}
              className="h-full"
              alt={products[0].companymodel}
            />
          )}
        </div>
        <div className="w-[34%]">
          {products.slice(1).map((product, index) => (
            <div
              className="cursor-pointer"
              key={index}
              onClick={() => handleImageClick(index + 1)}
            >
              <img src={product.photos[0]} alt={product.companymodel} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Showcase;
