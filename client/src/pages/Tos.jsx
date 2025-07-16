import React from "react";

const Tos = () => {
  return (
    <div className="flex flex-col lg:w-[40vw] py-4 mx-auto rounded shadow-lg px-4 mt-2">
      <h1 className="font-mentra text-3xl">Returns & Exchange</h1>
      <hr className="bg-black border-black" />
      <div className="my-6 flex flex-col">
        <div className="my-4 font-bold text-2xl">Introduction</div>
        <p>
          Hark, noble traveler. Thou hast ventured into the sanctum of SneakPeek
          — curators of elusive and ethereal wares. Be it known throughout the
          Lands Between and beyond: all purchases made upon this site are but
          tokens of support or illusion — no tangible goods shall be delivered.
          What thou buyest, thou buyest in spirit.
        </p>
        <div className="my-4 font-bold text-2xl">
          Returns, Exchange, and Cancellation
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="font-bold inline-block">No Returns:</div> Let it be
            etched in stone — all offerings made upon SneakPeek are final. No
            coin shall be returned, nor shall any recompense be offered. Choose
            with wisdom, for no product shall grace thy doorstep.
          </li>
          <li>
            <div className="font-bold inline-block">Exchanges:</div> Though the
            realm permits talk of exchange within 30 suns of thy offering, know
            this: as no wares shall ever pass into thy hands, so too no wares
            may be returned. The notion of exchange is but ceremonial.
          </li>
          <li>
            <div className="font-bold inline-block">Process:</div> Shouldst thou
            still seek to reach our emissaries, thou may do so via the
            designated channels. Yet be warned — thy hands shall remain empty,
            for there are no wares to send, nor to return.
          </li>
          <li>
            <div className="font-bold inline-block">Inspection:</div> Were there
            goods, our guardians would gaze upon them with scrutiny. But alas —
            no goods shall be dispatched, and none shall be inspected. The
            ritual ends at thy purchase.
          </li>
          <li>
            <div className="font-bold inline-block">Cancellations:</div> Thou
            mayest withdraw thy coin before the phantom of dispatch is conjured.
            Yet know — this realm grants no merchandise. Thy gold buys not a
            thing, but the dream of possession.
          </li>
          <li>
            <div className="font-bold inline-block">
              Damaged or Defective Items:
            </div>{" "}
            Speak not of defects, for no physical relic shall be borne to thee.
            All items are of spectral nature — impervious to flaw, yet absent
            from grasp. If thine expectations clash with reality, our emissaries
            shall listen, though they may not deliver.
          </li>
        </ul>
      </div>
      <hr className="bg-black border-black" />
      <h1 className="font-mentra text-xl mt-4">SneakPeek</h1>
      <p className="mb-4 italic">
        Merchants of the Unseen. Bearers of Illusion. Guardians of Hollow Wares.
      </p>
    </div>
  );
};

export default Tos;
