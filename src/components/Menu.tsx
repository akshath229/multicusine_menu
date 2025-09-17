"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

type Ingredient = { name: string; amount: string; calories: number };

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  category?: string;
  image?: string;
  ingredients?: Ingredient[];
  calories?: number; // optional precomputed calories
};

function computeCalories(item: MenuItem) {
  if (typeof item.calories === "number") return item.calories;
  if (!item.ingredients) return 0;
  return item.ingredients.reduce((s, ing) => s + (ing.calories || 0), 0);
}

function MenuItemCard({
  item,
  expanded,
  onToggle,
}: {
  item: MenuItem;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const totalCalories = computeCalories(item);

  return (
    <div className="w-full max-w-2xl border rounded-lg overflow-hidden">
      <button
        onClick={() => onToggle(item.id)}
        className="w-full flex items-center gap-4 p-4 bg-white dark:bg-black"
        aria-expanded={expanded}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={64}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="w-24 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
        <div className="flex-1 text-left">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="text-right">
              <div className="text-sm text-gray-500">{item.price}</div>
              <div className="text-xs text-gray-400">{totalCalories} kcal</div>
            </div>
          </div>
          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
          )}
        </div>
        <div className="text-sm text-gray-400">{expanded ? "▲" : "▼"}</div>
      </button>

      <div
        className={`px-4 pb-4 transition-[max-height] duration-200 ease-in-out bg-gray-50 dark:bg-gray-900 ${
          expanded ? "max-h-[800px]" : "max-h-0"
        } overflow-hidden`}
      >
        {expanded && (
          <div className="pt-3">
            <h4 className="font-medium mb-2">Ingredients</h4>
            <div className="flex flex-col gap-2">
              {item.ingredients && item.ingredients.length > 0 ? (
                item.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div>{ing.name} · {ing.amount}</div>
                    <div>{ing.calories} kcal</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No ingredient details</div>
              )}

              <div className="border-t pt-2 mt-2 text-sm font-semibold flex justify-between">
                <div>Total Calories</div>
                <div>{totalCalories} kcal</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Menu({ items }: { items: MenuItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => set.add(it.category ?? "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((it) => (it.category ?? "Uncategorized") === selectedCategory);
  }, [items, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="overflow-x-auto py-2">
        <div className="flex gap-3 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((it) => (
          <MenuItemCard
            key={it.id}
            item={it}
            expanded={expandedId === it.id}
            onToggle={toggleExpand}
          />
        ))}
      </div>
    </section>
  );
}
