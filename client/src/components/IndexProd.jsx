import React, { useState, useEffect } from "react";
import axios from "axios";

const IndexProd = ({ setShowModal, setSelectedProductId }) => {
  const [products, setProducts] = useState([]);

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

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:mx-2">
      {products.map((product) => (
        <div key={product._id}>
          <span className="flex border shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-4 my-4 rounded-lg">
            <div className="flex flex-col">
              <div className="rounded-t-lg cursor-pointer w-[27rem] h-[20rem] max-h-[15rem] overflow-hidden relative items-center justify-center object-cover">
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
                  <div className="cursor-pointer">
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
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <div className="cursor-pointer">
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
