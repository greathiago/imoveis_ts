// src/hooks/useProperties.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Filters } from '@/components/SearchFilter';

export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  address: string;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  mainImage: SanityImageSource;
  status: string;
  propertyType: string;
}

const normalizeText = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const query = `*[_type == "property"] | order(_createdAt desc){
        _id, title, slug, price, address, city, neighborhood, bedrooms, bathrooms, area, mainImage, status, propertyType
      }`;
      const props: Property[] = await client.fetch(query);
      setProperties(props);
      setFilteredProperties(props);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const handleFilter = useCallback((filters: Filters) => {
    setLoading(true);
    let filtered = [...properties];

    if (filters.purpose) {
      filtered = filtered.filter(p => p.status === filters.purpose);
    }

    if (filters.category && filters.category !== 'todos') {
      filtered = filtered.filter(p => p.propertyType.toLowerCase() === filters.category);
    }

    if (filters.city) {
      filtered = filtered.filter(p => normalizeText(p.city).includes(normalizeText(filters.city)));
    }

    if (filters.price) {
      filtered = filtered.filter(p => p.price >= filters.price.min && p.price <= filters.price.max);
    }

    if (filters.area) {
      const maxarea = filters.area.max === 0 ? Infinity : filters.area.max;
      filtered = filtered.filter(p => p.area >= filters.area.min && p.area <= maxarea);
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
    }
    console.log(filters, filtered, properties);

    setFilteredProperties(filtered);
    setLoading(false);
  }, [properties]);

  return { properties: filteredProperties, loading, handleFilter };
}
