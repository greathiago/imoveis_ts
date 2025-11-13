// src/sanity/schemaTypes/property.ts

import { defineField, defineType } from 'sanity'

const generateRandomString = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    const result = Array.from(randomValues).map((byte) => characters[byte % characters.length]).join('');

    return result;
}

export const property = defineType({
    name: 'property',
    title: 'Imóvel',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título do Anúncio',
            type: 'string',
            validation: (Rule) => Rule.required().error('O título é obrigatório.'),
        }),
        defineField({
            name: 'slug',
            title: 'URL Amigável (Slug)',
            type: 'slug',
            initialValue: () => ({
                _type: 'slug',
                current: generateRandomString(),
            }),

            readOnly: true,
            options: {
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },

            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagem Principal',
            type: 'image',
            options: {
                hotspot: true, // Permite focar a imagem
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Galeria de Fotos',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'price',
            title: 'Preço (R$)',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'À Venda', value: 'venda' },
                    { title: 'Para Alugar', value: 'aluguel' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'propertyType',
            title: 'Tipo de Imóvel',
            type: 'string',
            options: {
                list: ['Casa', 'Apartamento', 'Terreno', 'Comercial', 'Chácara'],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'city',
            title: 'Cidade',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'neighborhood',
            title: 'Bairro',
            type: 'string',
            // validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'address',
            title: 'Endereço (Rua)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bedrooms',
            title: 'Quartos',
            type: 'number',
        }),
        defineField({
            name: 'bathrooms',
            title: 'Banheiros',
            type: 'number',
        }),
        defineField({
            name: 'area',
            title: 'Área (m²)',
            type: 'number',
        }),
        defineField({
            name: 'builtArea',
            title: 'Área Construída (m²)',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Descrição Completa',
            type: 'text', // Para textos longos
            validation: (Rule) => Rule.required(),
        }),
    ],
})