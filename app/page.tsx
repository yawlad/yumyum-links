"use client";

import { FC, useState } from "react";

import {
  faInstagram,
  faTiktok,
  faTelegram,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import LinkItem from "@/components/LinkItem";
import TelegramModal from "@/components/TelegramModal";

interface SocialLink {
  name: string;
  href: string;
  icon: IconDefinition;
}

const links: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/yumyum.asianshop/",
    icon: faInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@asianshopyumyum",
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
    <main className="min-h-[100dvh] bg-gradient-to-br from-pink-400 to-yellow-200 flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center relative">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-shadow-lg">
          НАШИ ССЫЛОЧКИ
        </h1>

        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <LinkItem
                name={link.name}
                icon={link.icon}
                onClick={() => handleLinkClick(link.name, link.href)}
              />
            </li>
          ))}
        </ul>

        {/* Modal */}
        <TelegramModal
          show={showModal}
          timer={timer}
          disabled={isButtonDisabled}
          onClose={() => setShowModal(false)}
          onProceed={proceedToTelegram}
        />
      </div>
    </main>
  );
};

export default LinksPage;
