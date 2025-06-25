import React from "react";

const Tnc = () => {
  return (
    <div className="flex flex-col w-[40vw] py-4 mx-auto rounded shadow-lg px-4 mt-2">
      <h1 className="font-mentra text-3xl">
        Terms and Conditions of SneakPeek
      </h1>
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
        <div className="my-4 font-bold text-2xl">Account Registration</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Eligibility:</div> By
            creating an account with SneakPeek, thou affirmest that thou art of
            age in thine own realm and possess the legal capacity to enter into
            this covenant.
          </li>
          <li>
            <div className="font-bold inline-block">Accuracy:</div> Thou vowest
            to provide true and accurate information during registration and to
            maintain the sanctity of thy account details.
          </li>
          <li>
            <div className="font-bold inline-block">Security:</div> Guard thy
            account credentials as one would a cherished relic. Thou art
            responsible for all deeds committed under thy account.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Use of Our Services</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Purpose:</div> SneakPeek’s
            domain is for lawful purposes only. Thou shalt not engage in any
            nefarious activities or use our services to cause harm or
            disruption.
          </li>
          <li>
            <div className="font-bold inline-block">Content:</div> The content
            within our realm, including texts, images, and logos, is the sacred
            property of SneakPeek. Thou mayest not reproduce or distribute said
            content without our express permission.
          </li>
          <li>
            <div className="font-bold inline-block">Behavior:</div> Thou shalt
            interact with our community with respect and integrity, abstaining
            from deceit, harassment, or any manner of misconduct.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Purchases and Payments</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Pricing:</div> The prices of
            our wares are as declared within our domain. SneakPeek reserves the
            right to alter prices at our discretion.
          </li>
          <li>
            <div className="font-bold inline-block">Payment:</div> Gold must be
            rendered in full at the time of purchase through the secure methods
            provided. Thy payment details are safeguarded by our stringent
            wards.
          </li>
          <li>
            <div className="font-bold inline-block">Order Acceptance:</div> Upon
            receipt of thy order, SneakPeek shall send thee a missive confirming
            its acceptance. We reserve the right to refuse or cancel orders at
            our discretion.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Shipping and Delivery</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Regions:</div> SneakPeek
            delivers to many lands. Availability of delivery shall be declared
            at the time of purchase.
          </li>
          <li>
            <div className="font-bold inline-block">Timeframes:</div> Estimated
            delivery times are provided, but delays may occur due to unforeseen
            circumstances beyond our control.
          </li>
          <li>
            <div className="font-bold inline-block">Liability:</div> Once thy
            order is dispatched, it is entrusted to our couriers. SneakPeek is
            not liable for any losses or damages occurring during transit, save
            for those required by law.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Returns and Refunds</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Eligibility:</div> Thou
            mayest return unworn, unaltered wares within 30 days of delivery, in
            their original packaging.
          </li>
          <li>
            <div className="font-bold inline-block">Process:</div> To initiate a
            return, contact our emissaries through the provided channels.
            Refunds shall be processed upon receipt and inspection of the
            returned wares.
          </li>
          <li>
            <div className="font-bold inline-block">Exclusions:</div> Custom or
            personalized items are not eligible for return, except in the case
            of defects.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Limitation of Liability</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">No Warranties:</div>{" "}
            SneakPeek provides its services and wares “as is,” without any
            warranties, express or implied.
          </li>
          <li>
            <div className="font-bold inline-block">Damages:</div> To the
            fullest extent permitted by law, SneakPeek shall not be liable for
            any indirect, incidental, or consequential damages arising from the
            use of our services.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Termination</div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Breach:</div> Shouldst thou
            breach these terms, SneakPeek reserves the right to terminate thy
            account and access to our services forthwith.
          </li>
          <li>
            <div className="font-bold inline-block">Voluntary Termination:</div>
            Thou mayest terminate thy account at any time by contacting our
            emissaries. Provisions concerning liabilities and duties accrued
            prior to termination shall survive.
          </li>
        </ul>
        <div className="my-4 font-bold text-2xl">Governing Law</div>
        <p>
          These terms and conditions are governed by the laws of the realm in
          which SneakPeek is established. Thou agreest to submit to the
          jurisdiction of said realm for any disputes arising from these terms.
        </p>
        <div className="my-4 font-bold text-2xl">Amendments</div>
        <p>
          SneakPeek may amend these terms at our discretion. Notice of
          significant changes shall be posted within our domain. Thy continued
          use of our services signifies acceptance of the revised terms.
        </p>
        <div className="my-4 font-bold text-2xl">Contact Us</div>
        <p>
          For any queries or concerns regarding these terms, or to seek
          clarification, thou mayest contact us at:
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">Email:</div>{" "}
            thy.email@sneakpeek.com
          </li>
          <li>
            <div className="font-bold inline-block">Address:</div> 123 Elden
            Street, Lands Between, ER 45678
          </li>
        </ul>
        <p className="my-4">
          May thy journey through SneakPeek be fortuitous and thy steps ever
          swift.
        </p>
      </div>
      <hr className="bg-black border-black" />
      <h1 className="font-mentra text-xl mt-4">SneakPeek</h1>
      <p className="mb-4">Guardians of the Finest Footwear</p>
    </div>
  );
};

export default Tnc;
