"use client";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CheckCertificatePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    number: string;
    date_of_issue: string;
    validity_period: string;
    is_activated: boolean;
  }>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/check-certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: code }),
    });
    setResult(null);
    setError("");
    const data = await res.json();

    setLoading(false);

    if (!data.found) {
      setError("Сертификат не найден");
      return;
    }

    setResult(data.data);
  };

  return (
    <main className="min-h-[100dvh] main_bg flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 z-0 main_smiles_bg"></div>
      <div className="max-w-sm w-full text-center relative p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#00000055] big-shadow border border-white/30 z-10">
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-wide animate-fadeIn text-center">
          Проверка сертификата
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите номер сертификата"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-300 text-gray-700 group
            ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className=" text-pink-500 group-hover:scale-105 transition-transform flex items-center justify-center gap-2">
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <FontAwesomeIcon icon={faCheckCircle} className="text-[28px]" />
              )}

              <span className="text-gray-800 text-[20px]">
                {loading ? "Проверяем..." : "Проверить"}
              </span>
            </div>
          </button>
        </form>

        {/* Ошибка */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg animate-fadeIn">
            <p className="font-semibold">Ошибка</p>
            <p>{error}</p>
          </div>
        )}

        {/* Результат */}
        {result && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 text-green-800 rounded-lg animate-fadeIn">
            <p className="font-semibold mb-2">Сертификат найден</p>

            <p>
              <strong>Номер:</strong> {result.number}
            </p>
            <p>
              <strong>Дата выдачи:</strong> {result.date_of_issue}
            </p>
            <p>
              <strong>Срок действия:</strong> {result.validity_period} месяцев
            </p>
            <p>
              <strong>Использован ли:</strong>{" "}
              {result.is_activated ? "Да" : "Нет"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
