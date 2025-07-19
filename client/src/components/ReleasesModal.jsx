import React from "react";
import { AnimatePresence, motion } from "framer-motion";

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
                <div className="text-2xl font-mentra">Fated Revelations</div>
                <div className="flex flex-col gap-3">
                  <p>
                    Hark, Tarnished! Cast aside the fading echoes of past
                    relics, for even the very fabric of the Lands Between hums
                    with new, untold power! Attend, and hear the boast of these
                    truly nascent artifices, forged from the very essence of
                    suffering and triumph!
                  </p>

                  <p>
                    From the primordial depths, behold the might of{" "}
                    <b>Dragonkin Scale</b>! These formidable foot-wrappings,
                    said to be hewn from the very hide of ancient drakes, offer
                    unparalleled defense against the fiercest blows, granting
                    the wearer the resilience of a true beast-lord. Forged in
                    the perilous Crucible of Farum Azula, they are a testament
                    to enduring power.
                  </p>

                  <p>
                    Next, from the maddening veil of dreams, we unveil the{" "}
                    <b>Moonlit Dream</b>! These ethereal boots, born of
                    forbidden knowledge and cosmic whispers, bestow a chilling
                    silence upon the wearer's steps, allowing them to glide
                    unseen through the waking nightmare. Woven in the Ethereal
                    Loom of the Hunter's Dream itself, they are a boon for those
                    who hunt the Eldritch.
                  </p>

                  <p>
                    Tremble before the unwavering will of{" "}
                    <b>Iron Will of Ashina</b>! These hardened shinobi
                    footwraps, steeped in the legacy of blade and bone, grant
                    unwavering footing amidst the most frantic skirmishes and
                    perilous leaps. Crafted within the very heart of the
                    Ascetic's Forge of Ashina Heights, they are for those who
                    walk the path of vengeance.
                  </p>

                  <p>
                    Witness the solemn resolve of <b>Unkindled Flame</b>! These
                    enduring soles, born from the very essence of perseverance,
                    carry the undying will of those who would defy fate itself.
                    They offer tireless endurance, guiding the steps of those
                    who seek to rekindle the flickering light, even from the
                    desolate Kiln of the First Flame.
                  </p>

                  <p>
                    And finally, for those destined for true dominion, behold
                    the <b>Great Runes</b>! These colossal greaves, imbued with
                    mere fragments of a shattered divinity, grant not just
                    stride, but an undeniable authority with every step. Forged
                    in the very Crucible of the Erdtree's Roots, they are
                    destined for the feet of a true Elden Lord, or a mad
                    demigod.
                  </p>

                  <p>
                    These are but a few of the nascent powers stirring in the
                    Lands Between and beyond, awaiting those brave enough, or
                    cursed enough, to claim them!
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
