"use client";

import { FC, useState } from "react";

import {
  faInstagram,
  faTiktok,
  faTelegram,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCartShopping,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import LinkItem from "@/components/LinkItem";
import TelegramModal from "@/components/TelegramModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialLink {
  name: string;
  href: string;
  icon: IconDefinition;
}

const links: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/shoop.yumyum/",
    icon: faInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@shop.yumyum",
    icon: faTiktok,
  },
  {
    name: "Telegram",
    href: "https://t.me/+5O6z10MRWQ9lYmU6",
    icon: faTelegram,
  },
  {
    name: "Интернет-магазин",
    href: "https://8001.emall.by",
    icon: faCartShopping,
  },
  {
    name: "Проверить сертификат",
    href: "/check-certificate",
    icon: faCheckCircle,
  },
];

const LinksPage: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleLinkClick = (name: string, href: string) => {
    if (name === "Telegram") {
      setShowModal(true);
      setIsButtonDisabled(true);
      setTimer(5);

      let count = 5;
      const interval = setInterval(() => {
        count -= 1;
        setTimer(count);
        if (count === 0) {
          setIsButtonDisabled(false);
          clearInterval(interval);
        }
      }, 1000);
    } else if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank");
    }
  };

  const proceedToTelegram = () => {
    setShowModal(false);
    window.open("https://t.me/+5O6z10MRWQ9lYmU6", "_blank");
  };

  return (
    <main className="min-h-[100dvh] main_bg flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 z-0 main_smiles_bg"></div>
      <div className="max-w-sm w-full text-center relative p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#00000055] big-shadow border border-white/30 z-10">
        <h1 className="text-3xl font-extrabold mb-8 text-white drop-shadow-lg tracking-wide animate-fadeIn">
          НАШИ ССЫЛОЧКИ
        </h1>

        <ul className="space-y-3 animate-fadeInSlow">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleLinkClick(link.name, link.href)}
                className="w-full cursor-pointer flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-300 text-gray-700 group"
              >
                <span className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-[28px] text-pink-500 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-lg font-semibold group-hover:text-pink-600 transition-colors">
                    {link.name}
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-pink-500 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal */}
      <TelegramModal
        show={showModal}
        timer={timer}
        disabled={isButtonDisabled}
        onClose={() => setShowModal(false)}
        onProceed={proceedToTelegram}
      />
    </main>
  );
};

export default LinksPage;
