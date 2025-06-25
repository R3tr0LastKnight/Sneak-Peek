import React from "react";
import { Dock, DockIcon } from "./magicui/dock.tsx";
import linked from "../assets/nav/icons8-linkedin.svg";
import git from "../assets/nav/icons8-github.svg";
import insta from "../assets/nav/icons8-insta.svg";
import twitter from "../assets/nav/icons8-twitter.svg";

const Dockx = () => {
  return (
    <Dock magnification={80} distance={100}>
      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
        <a
          href={
            "https://in.linkedin.com/in/shubh-shahu?trk=people-guest_people_search-card"
          }
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-1/2 md:w-full" src={linked} alt="" />
        </a>
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
        <a
          href={"https://github.com/R3tr0LastKnight"}
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-1/2 md:w-full" src={git} alt="" />
        </a>
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
        <a
          href={"https://www.instagram.com/sneak_peeeeek?igsh=eG5mamJiZHl0Nnh5"}
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-1/2 md:w-full" src={insta} alt="" />
        </a>
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
        <a
          href={"https://x.com/SneakPeeeeeek"}
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-1/2 md:w-full" src={twitter} alt="" />
        </a>
      </DockIcon>
    </Dock>
  );
};

export default Dockx;
