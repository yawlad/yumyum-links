"use client";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface LinkItemProps {
  name: string;
  icon: IconDefinition;
  onClick: () => void;
}

const LinkItem: FC<LinkItemProps> = ({ name, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-xl hover:bg-pink-50 transition duration-200 text-gray-700"
    >
      <span className="flex items-center space-x-3">
        <FontAwesomeIcon icon={icon} className="text-[26px]" />
        <span className="text-lg font-medium">{name}</span>
      </span>
      <FontAwesomeIcon icon={faArrowRight} className="text-pink-500" />
    </button>
  );
};

export default LinkItem;
