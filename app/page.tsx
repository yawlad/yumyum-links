"use client";

import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCartShopping,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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
    // href: "https://t.me/yumyum_asianshop",
    href: "https://t.me/+5O6z10MRWQ9lYmU6",
    icon: faTelegram,
  },
  {
    name: "Интернет-магазин",
    href: "https://8001.emall.by",
    icon: faCartShopping,

    
  },
];

const LinksPage: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLinkClick = (name: string, href: string) => {
    if (name === "Telegram") {
      setShowModal(true);
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
              <button
                onClick={() => handleLinkClick(link.name, link.href)}
                className="w-full cursor-pointer flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-xl hover:bg-pink-50 transition duration-200 text-gray-700"
              >
                <span className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={link.icon} className="text-[26px]" />
                  <span className="text-lg font-medium">{link.name}</span>
                </span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-pink-500"
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-xl max-w-sm w-full max-h-[90dvh] overflow-y-auto p-5 pb-0 text-center relative">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Не открывается Telegram?
              </h2>
              <div className="flex justify-center gap-4">
                <Image
                  src="/help_1.jpg"
                  alt="Подсказка 1"
                  width={300}
                  height={200}
                  className="rounded-lg w-[45%] h-auto object-contain"
                />
                <Image
                  src="/help_2.jpg"
                  alt="Подсказка 2"
                  width={300}
                  height={200}
                  className="rounded-lg w-[45%] h-auto object-contain"
                />
              </div>
              <div className="flex justify-between flex-col gap-2 sticky bottom-0 bg-white py-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={proceedToTelegram}
                  className="w-full cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-200"
                >
                  Перейти в Telegram
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default LinksPage;
