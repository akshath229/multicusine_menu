"use client";

import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";

const SAMPLE_MENU = [
  {
    id: "1",
    name: "Plain Dosa",
    description: "Crispy South Indian dosa served with coconut chutney and sambar",
    price: "₹60",
    category: "Dosa",
    image: "/dosa.svg",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Oil", amount: "10ml", calories: 90 },
      { name: "Salt", amount: "2g", calories: 0 },
    ],
  },
  {
    id: "2",
    name: "Masala Dosa",
    description:
      "Crispy dosa stuffed with spiced potato masala, served with chutney & sambar",
    price: "₹90",
    category: "Dosa",
    image: "/masala-dosa.svg",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Potato", amount: "100g", calories: 90 },
      { name: "Onion", amount: "40g", calories: 40 },
      { name: "Oil", amount: "15ml", calories: 135 },
      { name: "Spices", amount: "5g", calories: 15 },
    ],
  },
  {
    id: "3",
    name: "Chicken Dosa",
    description: "Dosa stuffed with spicy chicken masala filling",
    price: "₹140",
    category: "Dosa",
    image: "/chicken-dosa.svg",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Chicken", amount: "120g", calories: 240 },
      { name: "Onion", amount: "40g", calories: 40 },
      { name: "Oil", amount: "15ml", calories: 135 },
      { name: "Spices", amount: "6g", calories: 20 },
    ],
  },
  {
    id: "4",
    name: "Beef Dosa",
    description: "Crispy dosa with Kerala-style beef masala filling",
    price: "₹160",
    category: "Dosa",
    image: "/beef-dosa.svg",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Beef", amount: "150g", calories: 250 },
      { name: "Onion", amount: "50g", calories: 45 },
      { name: "Oil", amount: "20ml", calories: 180 },
      { name: "Spices", amount: "8g", calories: 25 },
    ],
  },
  {
    id: "5",
    name: "Cheese Dosa",
    description: "Crispy dosa layered with melted cheese",
    price: "₹110",
    category: "Dosa",
    image: "/cheese-dosa.svg",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Cheese", amount: "60g", calories: 240 },
      { name: "Oil", amount: "10ml", calories: 90 },
    ],
  },
  {
    id: "6",
    name: "Filter Coffee",
    description: "Traditional South Indian filter coffee with frothy milk",
    price: "₹40",
    category: "Beverages",
    image: "/filter-coffee.svg",
    ingredients: [
      { name: "Coffee Powder", amount: "10g", calories: 20 },
      { name: "Milk", amount: "120ml", calories: 80 },
      { name: "Sugar", amount: "10g", calories: 40 },
    ],
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.style.background = "#0f172a";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background = "#ffffff";
    }
  }, [dark]);

  return (
    <div className="font-sans min-h-screen flex flex-col items-center px-6 py-10 bg-white dark:bg-black transition-colors duration-300">
      <header className="w-full max-w-4xl flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multicuisine Menu</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Welcome — browse our restaurant menu below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Dark mode</label>
          <button
            onClick={() => setDark((d) => !d)}
            className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative"
            aria-pressed={dark}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                dark ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl">
        <Menu items={SAMPLE_MENU} />
      </main>

      <footer className="mt-12 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Multicuisine Restaurant. All rights reserved.
      </footer>
    </div>
  );
}