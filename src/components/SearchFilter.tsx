// src/components/SearchFilter.tsx

// (No futuro, este componente receberá 'props' para os filtros funcionarem)
export default function SearchFilter() {
  return (
    // O container principal com fundo branco, bordas arredondadas e sombra
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Filtro: Finalidade */}
        <div>
          <label htmlFor="finalidade" className="block text-sm font-medium text-gray-700">Finalidade</label>
          <select id="finalidade" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Venda</option>
            <option>Aluguel</option>
          </select>
        </div>

        {/* Filtro: Categoria */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <select id="categoria" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Todos</option>
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno</option>
            <option>Comercial</option>
          </select>
        </div>

        {/* Filtro: Cidade */}
        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
          <select id="cidade" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Uberlândia</option>
            <option>Araguari</option>
            <option>Ituiutaba</option>
          </select>
        </div>

        {/* Botão de Busca */}
        <button
          type="button"
          className="w-full bg-brand-gold text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          {/* Você pode adicionar um ícone de busca aqui depois */}
          Buscar Imóvel
        </button>
      </div>
    </div>
  );
}