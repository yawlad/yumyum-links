"use client";

import { FC } from "react";
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
    href: "https://t.me/yumyum_asianshop",
    icon: faTelegram,
  },
  {
    name: "Интернет-магазин",
    href: "https://8001.emall.by",
    icon: faCartShopping,
  },
];

const LinksPage: FC = () => {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-pink-400 to-yellow-200 flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-shadow-lg">НАШИ ССЫЛОЧКИ</h1>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-xl hover:bg-pink-50 transition duration-200 text-gray-700"
              >
                <span className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={link.icon} className="text-[26px]" />
                  <span className="text-lg font-medium">{link.name}</span>
                </span>
                <FontAwesomeIcon icon={faArrowRight} className="text-pink-500"/>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default LinksPage;
