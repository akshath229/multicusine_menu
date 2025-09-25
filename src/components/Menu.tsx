"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TracingBeam } from "../components/tracingbeam"; // <-- import beam
import SearchBar from "./SearchBar";

type Ingredient = { name: string; amount: string; calories: number };

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  category?: string;
  image?: string;
  ingredients?: Ingredient[];
  calories?: number;
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
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement[]>([]);
  const totalCalories = computeCalories(item);

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.fromTo(
          ingredientsRef.current,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            delay: 0.15,
            duration: 0.4,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          cardRef.current,
          { scale: 0.98, boxShadow: "0 0 0 rgba(0,0,0,0)" },
          {
            scale: 1,
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            duration: 0.4,
            ease: "back.out(1.6)",
          }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(cardRef.current, {
          scale: 1,
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          duration: 0.3,
          ease: "power1.out",
        });
      }
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: expanded ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className="menu-card relative w-full max-w-2xl border rounded-2xl overflow-hidden shadow-sm transition-all"
      style={{ backgroundColor: '#FCF8EC', borderColor: '#EFE6D0' }}
    >
      {/* Card header (title + price badge) */}
      <div
        role="button"
        onClick={() => onToggle(item.id)}
        aria-expanded={expanded}
        className="cursor-pointer select-none"
      >
        <div className="p-6 pt-6 pb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold" style={{ color: '#6F6353' }}>{item.name}</h3>
            <div className="flex-1 h-px ml-4" style={{ backgroundColor: '#E7DFC9' }} />
          </div>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-md" style={{ backgroundColor: '#6B7A4A', color: '#FCF8EC' }}>
            {item.price}
          </div>
        </div>

        {/* Image (centered) */}
        <div className="flex justify-center -mt-6 px-6">
          {item.image ? (
            <div className="relative">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={140}
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="w-36 h-24 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
              No image
            </div>
          )}
        </div>

        {/* Short description */}
        {item.description && (
          <div className="px-6 pt-4 pb-4 text-sm text-gray-600">
            {item.description}
          </div>
        )}
      </div>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        className="px-6 pb-4 overflow-hidden"
        style={{ backgroundColor: '#FCF8EC', height: 0, opacity: 0 }}
      >
        <div className="pt-3">
          <h4 className="font-medium mb-2">Ingredients</h4>
          <div className="flex flex-col gap-2">
            {item.ingredients?.length ? (
              item.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) ingredientsRef.current[idx] = el;
                  }}
                  className="flex justify-between text-sm text-gray-700 opacity-0"
                >
                  <div>
                    {ing.name} · {ing.amount}
                  </div>
                  <div>{ing.calories} kcal</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No ingredient details
              </div>
            )}

            <div className="border-t pt-2 mt-2 text-sm font-semibold flex justify-between">
              <div>Total Calories</div>
              <div>{totalCalories} kcal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu({ items }: { items: MenuItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => set.add(it.category ?? "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let filteredItems = items;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filteredItems = filteredItems.filter(
        (it) => (it.category ?? "Uncategorized") === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.ingredients?.some(ing => ing.name.toLowerCase().includes(query))
      );
    }
    
    return filteredItems;
  }, [items, selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  const handleCategoryChange = (category: string) => {
    // Enhanced button press animation
    const buttonIndex = categories.indexOf(category);
    const button = buttonRefs.current[buttonIndex];
    
    if (button) {
      // Create a satisfying button press animation
      gsap.timeline()
        .to(button, {
          scale: 0.9,
          y: 2,
          duration: 0.1,
          ease: "power2.out"
        })
        .to(button, {
          scale: 1.05,
          y: -2,
          duration: 0.15,
          ease: "back.out(1.7)"
        })
        .to(button, {
          scale: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out"
        });
    }
    
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".menu-card");
      
      // Animate out current cards with GSAP
      gsap.to(cards, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.05,
        onComplete: () => {
          // Animate in new cards with GSAP
          gsap.fromTo(
            cards,
            { 
              opacity: 0, 
              y: 50, 
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.2)",
            }
          );
        }
      });
    }
  }, [filtered]);

  // Animate category buttons on mount
  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      gsap.fromTo(
        buttonRefs.current,
        { 
          opacity: 0, 
          y: -20, 
          scale: 0.8 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }
      );
    }
  }, []);

  // Add hover animations to buttons
  useEffect(() => {
    buttonRefs.current.forEach((button, index) => {
      if (button) {
        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mouseenter', handleMouseEnter);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, [categories]);

  return (
    <section className="w-full flex flex-col gap-6" style={{ backgroundColor: '#F3E7D7' }}>
      <div className="w-full flex justify-center">
  <div className="w-full max-w-4xl p-6 rounded-3xl overflow-hidden shadow-md" style={{ backgroundColor: '#FAF4E2' }}>
          {/* Search Bar */}
          <SearchBar 
            onSearch={setSearchQuery}
          />
          
          <div className="overflow-x-auto py-2">
            <div className="flex gap-3 px-1">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  ref={(el) => { buttonRefs.current[index] = el; }}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "shadow-lg"
                      : "hover:shadow-md"
                  }`}
                    style={{
                    backgroundColor: selectedCategory === cat ? '#6B715C' : '#FAF4E2',
                    color: selectedCategory === cat ? '#FAF4E2' : '#6B715C',
                    borderColor: '#6B715C'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Wrap cards in TracingBeam */}
            <div ref={containerRef} className="mt-6 flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((it) => (
              <MenuItemCard
                key={it.id}
                item={it}
                expanded={expandedId === it.id}
                onToggle={toggleExpand}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                No items found
              </div>
              <div className="text-sm text-gray-400">
                Try adjusting your search or category filter
              </div>
            </div>
          )}
            </div>
        </div>
      </div>
    </section>
  );
}
