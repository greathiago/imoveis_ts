// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-brand-green text-white pt-12">
      <div className="container mx-auto py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Taise Silva - Corretora de Imóveis. Todos os direitos reservados.</p>
        <p className="text-sm text-gray-400 mt-2">Desenvolvido com ♥</p>
      </div>
    </footer>
  );
}