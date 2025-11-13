// src/components/SearchFilter.tsx
"use client";

import { useState } from 'react';
import NumberSelector from './NumberSelector';
import NumericInput from './NumericInput';
import CurrencyInput from './CurrencyInput';

export interface Filters {
  purpose: string;
  category: string;
  city: string;
  price: { min: number; max: number };
  area: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
}

interface SearchFilterProps {
  onFilter: (filters: Filters) => void;
}

export default function SearchFilter({ onFilter }: SearchFilterProps) {
  const [purpose, setPurpose] = useState('venda');
  const [category, setCategory] = useState('todos');
  const [city, setCity] = useState('uberlandia');
  const [price, setPrice] = useState({ min: 0, max: Infinity });
  const [area, setArea] = useState({ min: 0, max: Infinity });
  const [bedrooms, setBedrooms] = useState(undefined as unknown as number);
  const [bathrooms, setBathrooms] = useState(undefined as unknown as number);

  const handleSearch = () => {
    onFilter({ purpose, category, city, price, area, bedrooms, bathrooms });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div>
          <label htmlFor="finalidade" className="block text-sm font-medium text-gray-700">Finalidade</label>
          <select 
            id="finalidade" 
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </select>
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <select 
            id="categoria" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="todos">Todos</option>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
          <select 
            id="cidade" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="uberlandia">Uberlândia</option>
            <option value="araguari">Araguari</option>
            <option value="ituiutaba">Ituiutaba</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1"/>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <CurrencyInput
            label="Preço Mínimo"
            value={price.min}
            onChange={(min) => setPrice({ ...price, min })}
            placeholder="R$ 0"
          />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <CurrencyInput
            label="Preço Máximo"
            value={price.max}
            onChange={(max) => setPrice({ ...price, max })}
            placeholder="R$ 10.000.000+"
          />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <NumericInput
            label="Área Mínima (m²)"
            value={area.min}
            onChange={(min) => setArea({ ...area, min })}
            placeholder="0m²"
          />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <NumericInput
            label="Área Máxima (m²)"
            value={area.max}
            onChange={(max) => setArea({ ...area, max })}
            placeholder="10.000m²"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
            <NumberSelector 
                label="Quartos"
                max={5}
                onChange={setBedrooms}
            />
        </div>

        <div className="col-span-1 md:col-span-2">
            <NumberSelector 
                label="Banheiros"
                max={5}
                onChange={setBathrooms}
            />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="w-full bg-brand-gold text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center md:col-start-4"
        >
          Buscar Imóvel
        </button>
      </div>
    </div>
  );
}