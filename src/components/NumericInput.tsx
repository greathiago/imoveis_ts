// src/components/NumericInput.tsx
"use client";

// import { useState } from 'react';

interface NumericInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function NumericInput({ label, value, onChange, placeholder }: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value === 0 || value === Infinity ? '' : value}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
      />
    </div>
  );
}
