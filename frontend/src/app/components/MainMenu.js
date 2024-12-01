"use client";
import React, { useState } from "react";
import {
  FaUserSecret,
  FaHome,
  FaUsers,
  FaTelegramPlane,
  FaCode,
  FaQuestionCircle,
  FaChevronCircleRight,
} from "react-icons/fa";

import "../../styles/Chat.css";
import Link from "next/link";
import { SiGitbook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mainMenu desktopMenu">
      <>
        <Link href="/" target="_blank" className="chatMainMenuItem pointer">
          <FaHome size={25} /> HOME
        </Link>
        <Link href="/docs" target="_blank" className="chatMainMenuItem pointer">
          <FaCode size={25} /> API
        </Link>
        <Link href="/faq" target="_blank" className="chatMainMenuItem pointer">
          <FaQuestionCircle size={25} /> FAQ
        </Link>
        <div className="chatMainMenuItem chatPageSocialMenu">
          <span className="">
            <FaUsers size={25} /> LINKS
          </span>
          <hr />
          <div className="chatPageSocialIcons">
            <a
              href="https://twitter.com/jailbreakme_xyz"
              target="_blank"
              className="pointer"
            >
              <FaXTwitter size={30} className="pointer" />
            </a>
            <a
              href="https://t.me/+-MZ4uveXh2swZmFk"
              target="_blank"
              className="pointer"
            >
              <FaTelegramPlane size={30} className="pointer" />
            </a>
            <a
              href="https://jailbreak.gitbook.io/jailbreakme.xyz"
              target="_blank"
              className="pointer"
            >
              <SiGitbook size={30} className="pointer" />
            </a>
          </div>
        </div>
        <button
          id="comingSoonButton"
          className="styledBtn grayed disabled"
          style={{ border: "0px", borderRadius: "5px", width: "100%" }}
        >
          Create Tournament
          <br />
          (Coming Soon) <FaChevronCircleRight className="disabled" />
        </button>
      </>
    </div>
  );
};

export default MainMenu;
