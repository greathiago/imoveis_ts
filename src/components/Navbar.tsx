// src/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="relative h-12 w-48">
            <Image
              src="/logo-taise-silva.png"
              alt="Taise Silva Imóveis"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-brand-gold transition-colors">Início</Link>
          <Link href="/quem-somos" className="hover:text-brand-gold transition-colors">Quem Somos</Link>
          <Link href="/imoveis" className="hover:text-brand-gold transition-colors">Comprar</Link>
          {/* Botão com as cores da marca */}
          <a href="#contato" className="bg-brand-green text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all">
            Contato
          </a>
        </div>
      </nav>
    </header>
  );
}