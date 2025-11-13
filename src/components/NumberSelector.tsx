// src/components/NumberSelector.tsx
"use client";

import { useState } from 'react';

interface NumberSelectorProps {
  label: string;
  max: number;
  onChange: (value: number) => void;
}

export default function NumberSelector({ label, max, onChange }: NumberSelectorProps) {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleSelect = (value: number) => {
    const newValue = selectedValue === value ? undefined as unknown as number : value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-2 space-x-2">
        {[...Array(max)].map((_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleSelect(value)}
              className={`px-4 py-2 border rounded-md ${selectedValue === value ? 'bg-brand-gold text-white' : 'bg-white'}`}>
              {value}+
            </button>
          );
        })}
      </div>
    </div>
  );
}
