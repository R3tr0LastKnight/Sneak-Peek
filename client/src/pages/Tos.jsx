import React from "react";

const Tos = () => {
  return (
    <div className="flex flex-col w-[40vw] py-4 mx-auto">
      <h1 className="font-mentra text-3xl">Retruns & Exchange</h1>
      <hr className="bg-black border-black" />
      <div className="my-6 flex flex-col">
        <div className="my-4 font-bold text-2xl">Introduction</div>
        <p>
          Greetings, brave wanderer! Thou hast entered the hallowed grounds of
          SneakPeek, purveyors of the finest footwear across the realms. By
          treading upon our digital paths and partaking in our services, thou
          agreest to abide by the terms and conditions set forth herein. May
          these words guide thee with clarity and honor.
        </p>
        <div className="my-4 font-bold text-2xl">
          Returns, Exchange, and Cancellation
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">No Returns:</div> There
            shall be no returns accepted for any wares purchased from SneakPeek.
            All sales are final, and thou art encouraged to make thy choices
            with due consideration.
          </li>
          <li>
            <div className="font-bold inline-block">Exchanges:</div> Exchanges
            are permitted within 30 days of delivery, provided the wares are
            unworn, unaltered, and in their original packaging. Custom or
            personalized items are not eligible for exchange, except in the case
            of defects.
          </li>
          <li>
            <div className="font-bold inline-block">Process:</div> To initiate
            an exchange, contact our emissaries through the provided channels.
            Exchanges shall be processed upon receipt and inspection of the
            returned wares.
          </li>
          <li>
            <div className="font-bold inline-block">Inspection:</div> Upon
            receiving thy returned wares for exchange, our guardians shall
            inspect them for wear or alteration. If thy wares are found in
            violation of the exchange policy, they shall be returned to thee,
            and no exchange shall be granted.
          </li>
          <li>
            <div className="font-bold inline-block">Cancellations:</div> Thou
            mayest cancel thy order before it has been dispatched by contacting
            our emissaries. Once dispatched, the order shall fall under the
            exchange policy.
          </li>
          <li>
            <div className="font-bold inline-block">
              Damaged or Defective Items:
            </div>{" "}
            Shouldst thou receive a damaged or defective item, contact our
            emissaries immediately. We shall provide instructions for returning
            the item and arrange for a replacement.
          </li>
        </ul>
      </div>
      <hr className="bg-black border-black" />
      <h1 className="font-mentra text-xl mt-4">SneakPeek</h1>
      <p className="mb-4">Guardians of the Finest Footwear</p>
    </div>
  );
};

export default Tos;
