import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const IndexProd = ({ setShowModal, setSelectedProductId }) => {
  const [products, setProducts] = useState([]);
  const [kart, setKart] = useState([]);
  const [wish, setWish] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [productExist,setProductsExist]=useState(false);
  const auth = JSON.parse(localStorage.getItem("auth"));
  //
  const [cartItems, setCartItems] = useState([]);

  const {profile}=useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getProducts`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

 

  useEffect(()=>{

    if(profile){
      const userId = auth.user._id;
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayCartProduct`,
            {
              params: { userId },
            }
          );
          setCartItems(response.data.products);
    
       
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItems();
    }
  },[profile])


  const checkProductInCart = async (productId) => {
    
    try {
      if(profile){

        const userId = auth.user._id;
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/check-product/${userId}/${productId}`);
      
     
      if(response.data.exists){
        setProductsExist(true);
      }
    }
    } catch (error) {
      console.error("Error checking product in cart", error);
      return false;
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

  
  

  // const handleDelete = async (productId) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/deleteCartProduct`,
  //       {
  //         data: { userId, productId },
  //       }
  //     );
  //     setKart(setKart.filter((item) => item.productId !== productId));
  //   } catch (error) {
  //     console.error("Error deleting cart item:", error);
  //   }
  // };



  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 select-none ">
      {products.map((product) => (
        <div key={product._id}>
          <span className="flex border shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-4 my-4 rounded-lg">
            <div className="flex flex-col w-full">
              <div className="rounded-t-lg cursor-pointer h-[12rem] w-full lg:w-[27rem] lg:h-[20rem] lg:max-h-[15rem] overflow-hidden relative items-center justify-center object-cover">
                <img
                  onClick={() => handleProductClick(product._id)}
                  src={product.photos}
                  alt=""
                  className="absolute "
                />
              </div>

              <div className="flex justify-between gap-8 mx-4 my-2">
                <div>
                  <h1
                    onClick={() => handleProductClick(product._id)}
                    className="hover:underline cursor-pointer font-semibold text-xl"
                  >
                    {product.companymodel}
                  </h1>
                  <p className="cursor-pointer">$ {product.price}</p>
                </div>
                <div className="flex gap-4 mr-4 my-2">
                  <div
                    onClick={() => {
                      
                        handleAdd(product?._id);
                       
                  
                    }}
                    className="cursor-pointer "
                  >
                    {!cartItems.some((item) => item.productId === product._id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg>
                    )}
                  </div>
                  <div
                    // onClick={() => {
                    //   if (!wish.includes(product._id)) {
                    //     setWish((prevWish) => [...prevWish, product._id]);
                    //     toast.info(`${product.companymodel} wishlisted`, {
                    //       position: "top-right",
                    //       autoClose: 1000,
                    //       hideProgressBar: false,
                    //       closeOnClick: true,
                    //       pauseOnHover: true,
                    //       draggable: true,
                    //       progress: undefined,
                    //       theme: "light",
                    //       transition: Bounce,
                    //     });
                    //   } else {
                    //     setWish((prevWish) =>
                    //       prevWish.filter(
                    //         (productId) => productId !== product._id
                    //       )
                    //     );
                    //     toast.info(
                    //       `${product.companymodel} removed from wishlist`,
                    //       {
                    //         position: "top-right",
                    //         autoClose: 1000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: "light",
                    //         transition: Bounce,
                    //       }
                    //     );
                    //   }
                    // }}
                    className="cursor-pointer"
                  >
                    {!wish.includes(product._id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default IndexProd;
