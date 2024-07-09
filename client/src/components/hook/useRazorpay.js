import { useEffect } from "react";

const useRazorpay = () => {
  // for razorpay loading
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((res) =>
      console.log(res)
    );
  }, []);
};

export default useRazorpay;
