"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Menu from "../components/Menu";

const SAMPLE_MENU = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Tomato, fresh mozzarella, basil, olive oil",
    price: "$12",
    category: "Pizzas",
    image: "/file.svg",
    ingredients: [
      { name: "Dough", amount: "200g", calories: 500 },
      { name: "Mozzarella", amount: "80g", calories: 250 },
      { name: "Tomato Sauce", amount: "60g", calories: 40 },
      { name: "Basil", amount: "5g", calories: 1 },
    ],
  },
  {
    id: "2",
    name: "Spicy Arrabbiata Pasta",
    description: "Penne with spicy tomato sauce and parmesan",
    price: "$10",
    category: "Pasta",
    image: "/globe.svg",
    ingredients: [
      { name: "Penne", amount: "180g", calories: 350 },
      { name: "Tomato Sauce", amount: "100g", calories: 60 },
      { name: "Parmesan", amount: "20g", calories: 80 },
    ],
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine, croutons, parmesan, Caesar dressing",
    price: "$8",
    category: "Salads",
    image: "/file.svg",
    ingredients: [
      { name: "Romaine", amount: "120g", calories: 20 },
      { name: "Croutons", amount: "30g", calories: 120 },
      { name: "Dressing", amount: "30g", calories: 180 },
    ],
  },
  {
    id: "4",
    name: "Tiramisu",
    description: "Classic Italian dessert with mascarpone",
    price: "$6",
    category: "Desserts",
    image: "/next.svg",
    ingredients: [
      { name: "Mascarpone", amount: "80g", calories: 300 },
      { name: "Ladyfingers", amount: "50g", calories: 200 },
      { name: "Coffee", amount: "30ml", calories: 5 },
    ],
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // default to white background
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.style.background = "#0f172a"; // dark slate
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background = "#ffffff";
    }
  }, [dark]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white dark:bg-black">
      <main className="flex flex-col gap-[24px] row-start-2 items-center sm:items-start w-full">
        <div className="w-full flex items-center justify-between max-w-4xl">
          <div>
            <h1 className="text-3xl font-bold">Multicusine Menu</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
              Welcome — browse the sample restaurant menu below. Replace the
              sample data with your menu items.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">Dark mode</label>
            <button
              onClick={() => setDark((d) => !d)}
              className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative"
              aria-pressed={dark}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  dark ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <Menu items={SAMPLE_MENU} />
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
