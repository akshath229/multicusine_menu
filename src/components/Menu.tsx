import React from "react";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  category?: string;
  image?: string;
};

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg w-full max-w-2xl">
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
      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {item.name}
          <span className="text-sm font-normal text-gray-500"> · {item.price}</span>
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export default function Menu({ items }: { items: MenuItem[] }) {
  const byCategory = items.reduce((acc: Record<string, MenuItem[]>, item) => {
    const cat = item.category ?? "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section className="w-full flex flex-col gap-8">
      {Object.keys(byCategory).map((cat) => (
        <div key={cat}>
          <h2 className="text-2xl font-bold mb-3">{cat}</h2>
          <div className="flex flex-col gap-3">
            {byCategory[cat].map((it) => (
              <MenuItemCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
