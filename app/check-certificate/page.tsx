"use client";

import { useState } from "react";

export default function CheckCertificatePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    number: string;
    date_of_issue: string;
    date_of_expire: string;
    is_active: boolean;
  }>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    const res = await fetch("/api/check-certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: code }),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.found) {
      setError("Сертификат не найден");
      return;
    }

    setResult(data.data);
  };

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-pink-400 to-yellow-200 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
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
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition font-medium flex items-center justify-center gap-2
            ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Проверяем..." : "Проверить"}
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
              <strong>Дата истечения:</strong> {result.date_of_expire}
            </p>
            <p>
              <strong>Активен:</strong> {result.is_active ? "Да" : "Нет"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
