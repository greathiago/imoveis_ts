// src/app/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import SearchFilter from '@/components/SearchFilter';

interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  mainImage: SanityImageSource;
}

function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(property.price);

  const link = property?.slug?.current ? `/imovel/${property.slug.current}` : '#';

  return (
    <Link href={link} className="group block">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
        <div className="relative w-full h-56">
          <Image
            src={urlFor(property.mainImage).url()}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-brand-green truncate" title={property.title}>
            {property.title}
          </h3>
          <p className="text-gray-600 mt-1">{property.address}</p>
          <p className="text-2xl font-bold mt-2 text-brand-gold">{formattedPrice}</p>
          <div className="flex justify-between text-sm mt-4 text-gray-700 border-t pt-3">
            <span>{property.bedrooms} Quartos</span>
            <span>{property.bathrooms} Banheiros</span>
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const query = `*[_type == "property"] | order(_createdAt desc){
    _id, title, slug, price, address, bedrooms, bathrooms, area, mainImage
  }`;
  
  const properties: Property[] = await client.fetch(query, {}, { next: { revalidate: 60 } });

  return (
    // Container principal com padding
    <div className="container mx-auto px-4 py-12">
      
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-6">
          Resultado de Busca
        </h1>
        <SearchFilter />
      </section>

      <section>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl">Nenhum imóvel encontrado.</p>
            <p>Cadastre novos imóveis no painel para vê-los aqui!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export const revalidate = 60;