import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Select from "react-select";
import { getData } from "country-list";
import useRazorpay from "../components/hook/useRazorpay";
const BillingPage = () => {
  useRazorpay();
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const indianStates = [
    { value: "AN", label: "Andaman and Nicobar Islands" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CH", label: "Chandigarh" },
    { value: "CT", label: "Chhattisgarh" },
    { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "DL", label: "Delhi" },
    { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JK", label: "Jammu and Kashmir" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "LA", label: "Ladakh" },
    { value: "LD", label: "Lakshadweep" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PY", label: "Puducherry" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TG", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "UT", label: "Uttarakhand" },
    { value: "WB", label: "West Bengal" },
    { value: "OTHER", label: "Other" },
  ];

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;

  const countries = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [cityName, setCityName] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipcode: "",
    landmark: "",
    phnumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setCityName(""); // Reset city name when state changes
  };

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

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

  const handlePayment = async () => {
    // try {
    //   const orderResponse = await axios.post(
    //     `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/createRzOrder`,
    //     {
    //       amount: subTotal,
    //       currency: "INR",
    //       userId: userId,
    //     }
    //   );
    //   const options = {
    //     key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    //     amount: orderResponse.data.amount,
    //     currency: orderResponse.data.currency,
    //     name: "Sneaker House",
    //     description: "Test Transaction",
    //     order_id: orderResponse.data.id,
    //     handler: async (response) => {
    //       try {
    //         const paymentVerificationResponse = await axios.post(
    //           `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/verifyPayment`,
    //           {
    //             razorpay_order_id: response.razorpay_order_id,
    //             razorpay_payment_id: response.razorpay_payment_id,
    //             razorpay_signature: response.razorpay_signature,
    //           }
    //         );
    //         if (paymentVerificationResponse.data.success) {
    //           alert("Payment successfully");
    //           navigate(`/ordersuccess/${response.razorpay_order_id}`);
    //         } else {
    //           alert("Payment verification failed");
    //         }
    //       } catch (error) {
    //         console.error("Error verifying payment:", error);
    //         alert("Payment verification failed");
    //       }
    //     },
    //     prefill: {
    //       name: auth.user.name,
    //       email: auth.user.email,
    //       contact: formData.phnumber,
    //     },
    //     theme: {
    //       color: "#3399cc",
    //     },
    //   };
    //   const rzp = new window.Razorpay(options);
    //   rzp.open();
    // } catch (error) {
    //   console.error("Error creating order:", error);
    //   alert("Error in creating order");
    // }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:mx-24 lg:mx-20 my-12 px-5">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="text-3xl font-mentra ">Billing details</div>
          <div className="grid lg:grid-cols-2 mt-8 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Country/Region
              </label>
              <div>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  options={countries}
                  placeholder="Select a country"
                  className="w-full md:w-3/4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                State
              </label>
              <div>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  options={indianStates}
                  placeholder="Select an Indian state"
                  className="w-full md:w-3/4"
                />
                {selectedState && selectedState.value === "OTHER" && (
                  <div className="flex flex-col gap-2 mt-4">
                    <label className="font-semibold">Enter City Name:</label>
                    <input
                      type="text"
                      value={cityName}
                      onChange={handleCityNameChange}
                      placeholder="Enter your city name"
                      className="border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                id=""
                value={formData.address}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Town / City
              </label>
              <input
                type="text"
                name="city"
                id=""
                value={formData.city}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Landmark
              </label>
              <input
                type="text"
                name="landmark"
                id=""
                value={formData.landmark}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Zip Code
              </label>
              <input
                type="number"
                name="zipcode"
                id=""
                value={formData.zipcode}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                name="phnumber"
                id=""
                value={formData.phnumber}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id=""
                value={auth.user.email}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-lg py-1.5 px-4 w-full md:w-3/4"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 border rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4">
          <div className="grid grid-cols-4 justify-between place-items-center font">
            <div className="font-bold">Sr. No.</div>
            <div className="font-bold">Product</div>
            <div className="font-bold">Brand</div>
            <div className="font-bold">SubTotal</div>
          </div>
          <div className="pb-4 lg:max-h-[16rem] lg:min-h-[16rem] overflow-y-scroll">
            {cartItems.map((item, key) => (
              <div
                key={item.productId}
                className="grid grid-cols-4 justify-between place-items-center py-3 border-b "
              >
                <div>{key + 1}</div>
                <div className="text-black">
                  {item.productDetails.companymodel}
                </div>
                <div>{item.productDetails.brand}</div>
                <div>&#8377; {item.productDetails.price}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 items-center mx-20 lg:mx-32 pb-8">
            <div>Total</div>
            <div className="text-[#000] font-bold text-xl">
              &#8377; {subTotal}.00
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 mx-auto rounded w-full md:w-3/4"
            onClick={handlePayment}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
      <div className=" md:mx-24 lg:mx-20 py-4 px-16 rounded-xl text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1 className="text-xl font-mentra">ATTENTION MAIDENLESS</h1>
        <h1>
          "In accordance with the ancient decrees, any purchase made upon this
          hallowed website shall bestow no goods unto thee."
        </h1>
      </div>
    </div>
  );
};

export default BillingPage;
