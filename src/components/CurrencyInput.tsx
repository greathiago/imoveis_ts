// src/components/CurrencyInput.tsx
"use client";

import { useState, useEffect } from 'react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const formatCurrency = (value: number) => {
  if (isNaN(value) || value === 0) {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly === '') {
    return 0;
  }
  const number = parseFloat(digitsOnly) / 100;
  return isNaN(number) ? 0 : number;
};

export default function CurrencyInput({ label, value, onChange, placeholder }: CurrencyInputProps) {
  if (value === Infinity) value = 0;
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numberValue = parseCurrency(rawValue);
    onChange(numberValue);
    setDisplayValue(rawValue);
  };

  const handleBlur = () => {
    setDisplayValue(formatCurrency(value));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
      />
    </div>
  );
}
