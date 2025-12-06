"use client";

import { FC } from "react";
import Image from "next/image";

interface TelegramModalProps {
  show: boolean;
  timer: number;
  disabled: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const TelegramModal: FC<TelegramModalProps> = ({
  show,
  timer,
  disabled,
  onClose,
  onProceed,
}) => {
  if (!show) return null;

  return (
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
            onClick={onClose}
            className="w-full cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition duration-200"
          >
            Отмена
          </button>

          <button
            onClick={onProceed}
            disabled={disabled}
            className={`w-full cursor-pointer px-4 py-2 rounded-full transition duration-200 ${
              disabled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {disabled
              ? `ЕСЛИ ТЕЛЕГРАМ НЕ ОТКРЫЛСЯ - ИНСТРУКЦИЯ ВЫШЕ ⬆️ (${timer}с)`
              : "Перейти в Telegram"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramModal;
