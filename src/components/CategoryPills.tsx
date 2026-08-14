"use client";

import React from "react";

interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-300 border ${
            selectedCategory === cat
              ? "bg-white/20 backdrop-blur-md border-white/40 text-white shadow-lg shadow-white/5"
              : "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/15 hover:border-white/20 text-zinc-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}