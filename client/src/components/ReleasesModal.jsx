import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ui from "../assets/patchnotes/ui.png";
import aws from "../assets/patchnotes/aws.png";
import raz from "../assets/patchnotes/raz.png";
import fire from "../assets/patchnotes/fire.png";
import ver from "../assets/patchnotes/ver.png";

const ReleasesModal = ({ showModal3, setShowModal3 }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: "-1000",
      opacity: 0,
    },
    visible: {
      y: "100px",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {showModal3 && (
        <motion.div
          variants={backdrop}
          inherit="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="bg-[rgba(0,0,0,0.6)] h-screen w-full fixed top-0 right-0 left-0  z-40 overflow-y-auto "
          onClick={() => setShowModal3(false)}
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            variants={modal}
            hidden="hidden"
            visible="visible"
            className="overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="px-4 lg:px-16 pt-8 lg:py-4 w-full">
              <div className="rounded-xl overflow-hidden flex flex-col px-4 py-4 lg:px-16 lg:py-16 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white relative w-full">
                <div
                  className="absolute top-4 right-4 z-30 cursor-pointer"
                  onClick={() => setShowModal3(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-mentra">Patch Notes </div>
                <div className="flex flex-col gap-3 mt-3">
                  <p>
                    Hark, Tarnished! Behold my passion project: a React-powered
                    online storefront crafted with care. Our customers can dive
                    into a well-maintained collection of sneakers, ready to find
                    their next perfect pair.
                  </p>

                  <p>
                    As for me, I'm a rising dragon in the world of web
                    development, constantly seeking out new challenges and
                    conquering them one by one. Each project is an opportunity
                    to hone my skills and expand my horizons, and this sneakers
                    website is no exception. It's a testament to my dedication
                    and passion for crafting engaging and functional digital
                    experiences.
                  </p>

                  <p className="flex text-xl font-mentra mt-4">Highlights</p>

                  <p className="text-lg font-bold">Dynamic UI</p>

                  <p className="flex flex-col lg:flex-row relative gap-5">
                    <div className="w-2/3">
                      This site features a truly dynamic user interface. You'll
                      find a captivating product carousel showcasing our latest
                      drops and bestsellers. Notice our website's name flowing
                      across the screen, a smoothly animated title that subtly
                      changes speed as you scroll, guiding you through our
                      exciting collection. Dive into our unique showcase
                      component, where three featured products elegantly switch
                      places with a click – one becoming prominently large while
                      the other two gracefully position themselves at its sides.
                      Don't miss our daily 'Drop of the Day,' always something
                      fresh and exciting! And of course, it's all built with
                      responsiveness in mind, ensuring a flawless experience on
                      any device, from desktop to mobile.
                    </div>
                    <img className="w-1/3 " src={ui} alt="" />
                  </p>

                  <p className="text-lg font-bold">RazorPay</p>

                  <p className="flex flex-col lg:flex-row relative gap-5">
                    <img className="w-1/3  " src={raz} alt="" />
                    <div className="w-2/3">
                      For secure and rapid financial transactions, this website
                      integrates Razorpay, a leading payment gateway. Razorpay
                      ensures that all customer payment information, from credit
                      card details to UPI IDs, is processed with the highest
                      level of security through PCI DSS Level 1 compliance,
                      robust encryption protocols (TLS/SSL), and advanced fraud
                      detection systems. This comprehensive security framework
                      provides our customers with peace of mind. Beyond
                      security, Razorpay is engineered for speed, offering
                      lightning-fast API response times and a seamless checkout
                      experience that minimizes delays, leading to quick payment
                      confirmations and efficient processing of orders. This
                      combination of security and speed makes transactions
                      smooth and reliable for every purchase.
                    </div>
                  </p>

                  <p className="text-lg font-bold">AWS Storage</p>

                  <p className="flex flex-col lg:flex-row relative gap-5">
                    <div className="w-2/3">
                      Our website's product catalog is entirely hosted on Amazon
                      Web Services (AWS) S3 buckets. This choice was fundamental
                      for building a scalable and reliable e-commerce platform.
                      S3 provides virtually unlimited storage, ensuring we can
                      expand our sneaker collection without infrastructure
                      concerns, while its "eleven nines" (99.999999999%)
                      durability guarantees our data is always protected and
                      available through redundant storage across multiple data
                      centers. This cloud-native approach also delivers high
                      performance for quick image and detail loading, operates
                      on a cost-effective pay-as-you-go model, and leverages
                      AWS's robust security features, including automatic
                      encryption and granular access controls, securing all
                      product information from unauthorized access and
                      integrating seamlessly for future enhancements.
                    </div>
                    <img className="w-1/3  " src={aws} alt="" />
                  </p>

                  <p className="text-lg font-bold">Firebase Google Auth</p>

                  <p className="flex flex-col lg:flex-row relative gap-5">
                    <img className="w-1/3  " src={fire} alt="" />
                    <div className="w-2/3">
                      Our commitment to a seamless user experience extends to
                      authentication, where we've integrated Google Login and
                      registration powered by Firebase. This allows customers to
                      quickly and securely access their accounts using their
                      existing Google credentials, eliminating the need to
                      create and remember new passwords. For new users, a smooth
                      registration process is automatically handled through
                      Firebase when they sign in with Google for the first time.
                      This not only enhances convenience but also leverages
                      Firebase's robust and secure authentication system,
                      providing enterprise-grade security, easy implementation,
                      and scalable user management without the overhead of
                      building a custom authentication backend.
                    </div>
                  </p>

                  <p className="text-lg font-bold">Vercel Deployment</p>

                  <p className="flex flex-col lg:flex-row relative gap-5">
                    <div className="w-2/3">
                      Finally, to ensure optimal performance and
                      maintainability, this project is deployed on Vercel,
                      leveraging a separate backend and frontend architecture.
                      The frontend, built with React, is deployed independently
                      on Vercel, benefiting from its global CDN for
                      lightning-fast delivery to users worldwide, automatic SSL
                      certificates, and seamless CI/CD pipeline for instant
                      deployments. The backend, designed as a separate service,
                      is also hosted independently, allowing for specialized
                      scaling and robust API management. This distinct
                      separation between frontend and backend not only enhances
                      scalability and flexibility for future updates and feature
                      additions but also significantly improves developer
                      collaboration and overall application resilience, as
                      issues in one layer are less likely to impact the other.
                    </div>{" "}
                    <img className="w-1/3  " src={ver} alt="" />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* <Toaster /> */}
    </AnimatePresence>
  );
};

export default ReleasesModal;
