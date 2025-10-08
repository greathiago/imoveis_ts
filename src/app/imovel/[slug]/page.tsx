// src/app/imovel/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BedDouble, Bath, Square, ArrowLeft } from "lucide-react";

interface PropertyDetails {
  title: string;
  address: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  status: 'venda' | 'aluguel';
  mainImage: SanityImageSource;
  gallery?: SanityImageSource[];
}

async function getProperty(slug: string) {
  const query = `*[_type == "property" && slug.current == $slug][0]{
    title,
    address,
    price,
    description,
    bedrooms,
    bathrooms,
    area,
    propertyType,
    status,
    mainImage,
    gallery
  }`;

  const property: PropertyDetails = await client.fetch(query, { slug });
  return property;
}

export default async function PropertyDetailsPage(props: PageProps<'/imovel/[slug]'>) {
  const { slug } = await props.params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(property.price);

  const features = [
    { icon: <BedDouble size={20} />, label: "Quarto(s)", value: property.bedrooms },
    { icon: <Bath size={20} />, label: "Banheiro(s)", value: property.bathrooms },
    { icon: <Square size={20} />, label: "Área (m²)", value: property.area },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="flex items-center text-brand-green hover:text-brand-gold mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Voltar para a lista de imóveis
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg mb-4">
                <Image
                  src={urlFor(property.mainImage).url()}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {property.gallery && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {property.gallery.map((image, index) => (
                    <div key={index} className="relative h-24 w-full rounded-md overflow-hidden">
                      <Image
                        src={urlFor(image).url()}
                        alt={`${property.title} - foto ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-brand-green">{property.title}</h1>
            <p className="text-gray-600 mt-2">{property.address}</p>

            <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl font-semibold text-brand-green mb-4">Descrição do Imóvel</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 p-6 rounded-lg shadow-md border">
              <p className="text-sm text-gray-500">{property.propertyType} para {property.status}</p>
              <p className="text-4xl font-extrabold text-brand-gold mt-2">{formattedPrice}</p>
              
              <ul className="mt-6 space-y-4 text-gray-800">
                {features.map(feature => feature.value && (
                  <li key={feature.label} className="flex items-center">
                    <span className="text-brand-green">{feature.icon}</span>
                    <span className="ml-3 font-medium">{feature.value}</span>
                    <span className="ml-1 text-gray-600">{feature.label}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/55SEUNUMERODOWHATSAPP?text=Olá,%20tenho%20interesse%20no%20imóvel:%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-opacity"
              >
                Falar com a Corretora
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}