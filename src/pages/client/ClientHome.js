import React, { useState } from 'react';

const STORES = [
  {
    id: 1,
    name: 'Artesanías Andres',
    products: [
      { id: 101, name: 'Pulsera tejida', price: 120 },
      { id: 102, name: 'Bolso artesanal', price: 350 },
    ],
  },
  {
    id: 2,
    name: 'Manos Creativas',
    products: [
      { id: 201, name: 'Collar de cuentas', price: 90 },
      { id: 202, name: 'Sombrero de palma', price: 220 },
    ],
  },
];

const ClientsHome = () => {
  const [tab, setTab] = useState('stores');

  const allProducts = STORES.flatMap(store =>
    store.products.map(product => ({
      ...product,
      storeName: store.name
    }))
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-800 text-center drop-shadow-lg tracking-wide">
        <span role="img" aria-label="store">🛍️</span> Tiendas y Artículos de venta
      </h2>
      <div className="flex justify-center mb-10 gap-4">
        <button
          className={`px-8 py-3 rounded-full font-bold shadow transition-all duration-200 border-2 ${
            tab === 'stores'
              ? 'bg-blue-600 text-white border-blue-600 scale-105'
              : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => setTab('stores')}
        >
          <span role="img" aria-label="store">🏬</span> Tiendas
        </button>
        <button
          className={`px-8 py-3 rounded-full font-bold shadow transition-all duration-200 border-2 ${
            tab === 'products'
              ? 'bg-blue-600 text-white border-blue-600 scale-105'
              : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => setTab('products')}
        >
          <span role="img" aria-label="products">🛒</span> Artículos
        </button>
      </div>
      {tab === 'stores' ? (
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORES.map(store => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200 border border-blue-100"
            >
              <div className="text-5xl mb-2">
                <span role="img" aria-label="store">🏬</span>
              </div>
              <div className="text-xl font-bold text-blue-700 mb-2">{store.name}</div>
              <div className="text-gray-500 text-sm">{store.products.length} artículos disponibles</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="py-3 px-5 text-left font-semibold">Tienda</th>
                <th className="py-3 px-5 text-left font-semibold">Artículo</th>
                <th className="py-3 px-5 text-left font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map(product => (
                <tr key={product.id} className="border-t hover:bg-blue-50 transition">
                  <td className="py-3 px-5 flex items-center gap-2">
                    <span role="img" aria-label="store">🏬</span>
                    <span className="font-medium text-blue-700">{product.storeName}</span>
                  </td>
                  <td className="py-3 px-5">{product.name}</td>
                  <td className="py-3 px-5 font-bold text-blue-600">${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default ClientsHome;