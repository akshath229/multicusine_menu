"use client";

import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import ScrollAnimation from "../components/ScrollAnimation";

const SAMPLE_MENU = [
  {
    id: "6",
    name: "Chai",
    description: "Traditional Indian spiced tea with aromatic spices and milk",
    price: "₹30",
    category: "Beverages",
    image: "/foodimages/chai.png",
    ingredients: [
      { name: "Tea Leaves", amount: "5g", calories: 10 },
      { name: "Milk", amount: "100ml", calories: 65 },
      { name: "Sugar", amount: "8g", calories: 32 },
      { name: "Spices", amount: "3g", calories: 5 },
    ],
  },
  {
    id: "1",
    name: "Plain Dosa",
    description: "Crispy South Indian dosa served with coconut chutney and sambar",
    price: "₹60",
    category: "Dosa",
    image: "/foodimages/plaindosa.png",
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
    image: "/foodimages/masaladosa.png",
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
    image: "/foodimages/chickendosa.png",
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
    image: "/foodimages/plaindosa.png",
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
    image: "/foodimages/plaindosa.png",
    ingredients: [
      { name: "Rice Batter", amount: "120g", calories: 210 },
      { name: "Urad Dal Batter", amount: "40g", calories: 120 },
      { name: "Cheese", amount: "60g", calories: 240 },
      { name: "Oil", amount: "10ml", calories: 90 },
    ],
  },

];

export default function Home() {
  useEffect(() => {
    // Force light mode always
    document.documentElement.classList.remove("dark");
    document.body.style.background = "#903E10";
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <div className="font-sans min-h-screen transition-colors duration-300 relative" style={{ backgroundColor: '#903E10' }}>
      {/* Scroll Animation Component */}
      <ScrollAnimation 
        title="Multicuisine Menu"
        subtitle="Experience the finest flavors from around the world. Browse our curated selection of authentic dishes."
        buttonText="Order Now"
        imageSrc="/foodimages/masaladosa.png"
      />
      
      {/* Menu Section */}
      <div className="container flex flex-col items-center px-6 py-10" style={{ backgroundColor: '#F3E7D7' }}>
        <header className="w-full max-w-4xl flex items-center justify-center mb-10">
          <div>
            <h1 className="text-6xl font-medium tracking-tight wonderbar-font" style={{ color: '#903E10' }}>Menu</h1>
            <p className="text-sm mt-1" style={{ color: '#403E41' }}>
            </p>
          </div>
        </header>

        <main className="w-full max-w-4xl">
          <Menu items={SAMPLE_MENU} />
        </main>

        <footer className="mt-12 text-xs" style={{ color: '#403E41' }}>
          © {new Date().getFullYear()} Multicuisine Restaurant. All rights reserved.
        </footer>
      </div>
    </div>
  );
}