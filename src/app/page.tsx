// src/app/imovel/page.tsx
"use client";

import SearchFilter from "@/components/SearchFilter";
import PropertyGrid from "@/components/PropertyGrid";
import { useProperties } from "@/hooks/useProperties";

export default function ImovelPage() {
  const { properties, loading, handleFilter } = useProperties();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-6">
          Resultado de Busca
        </h1>
        <SearchFilter onFilter={handleFilter} />
      </section>

      {loading ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-xl">Carregando imóveis...</p>
        </div>
      ) : (
        <PropertyGrid properties={properties} />
      )}
    </div>
  );
}
