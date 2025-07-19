import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const BrandsModal = ({ showModal2, setShowModal2 }) => {
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
      {showModal2 && (
        <motion.div
          variants={backdrop}
          inherit="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="bg-[rgba(0,0,0,0.6)] h-screen w-full fixed top-0 right-0 left-0  z-40 overflow-y-auto "
          onClick={() => setShowModal2(false)}
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
                  onClick={() => setShowModal2(false)}
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
                <div className="text-2xl font-mentra">Hollowed Makers</div>
                <p>
                  Hark, Tarnished! Ye have witnessed but a glimpse of the
                  foot-garb, yet each is a relic, imbued with the spirit of the
                  Lands Between! Attend, and hear the boast of these legendary
                  artifices! From the nimble touch of <b>Feline Grace</b>, light
                  as a demigod's whisper, to the unyielding might of{" "}
                  <b>Stormcaller's Hoof</b>, echoing the thunderous charge of
                  ancient champions! Behold the grim resolve of{" "}
                  <b>Shadowfell Soles</b>, born of dark purpose, and the fiery
                  vitality of <b>Forgefire</b>, ever burning with untamed
                  motion. The enduring spirit of the <b>Ancient Mark</b> has
                  guided countless pilgrims, while the regal ambition of{" "}
                  <b>Elden Crest</b> demands ascension to true glory. Seek not
                  to underestimate the <b>Tarnished Relic</b>, for even in its
                  wear, it carries the wisdom of ages, or the radiant blessing
                  of the <b>Golden Vow</b>, shimmering with the Erdtree's light.
                  Even the humble <b>Vagrant's Sole</b> speaks of unyielding
                  journeys, whilst <b>The Immaculate</b> offers a fleeting
                  glimpse of pristine purity in a blighted world. Feel the
                  ethereal swiftness of <b>Whispersilk</b>, and bow to the
                  arcane power held within <b>Carian Regalia</b>, woven with
                  lunar magic itself. Fear not the sanguine fury of the{" "}
                  <b>Crucible Knight's Footing</b>, stained with honor, nor
                  overlook the steadfast faith of the <b>Threefold Oath</b>,
                  guiding hands to destiny. The relentless pursuit of{" "}
                  <b>Blightborne Steps</b> marks a hunter's true calling, and
                  the <b>Sentinel's Embrace</b> defies the very bite of the
                  chilling northwinds. And finally, the{" "}
                  <b>Nightwalker's Hide</b>, a cloak of silence for those who
                  move unseen. Each, a fragment of legend. Each, a testament to
                  those who tread the perilous path. Choose wisely, for your
                  fate, Tarnished, may well rest upon the very soles you bear!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* <Toaster /> */}
    </AnimatePresence>
  );
};

export default BrandsModal;
