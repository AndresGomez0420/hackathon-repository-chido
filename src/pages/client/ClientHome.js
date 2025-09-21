import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailView from '../../components/ProductDetailView';

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const allProducts = STORES.flatMap(store =>
    store.products.map(product => ({
      ...product,
      storeName: store.name
    }))
  );

  const productsDetails = {
    101: {
      id: 101,
      title: 'Pulsera tejida',
      description: 'Hermosa pulsera tejida a mano con técnicas tradicionales. Cada pieza es única y representa el arte ancestral de nuestros artesanos.',
      price: '$120.00',
      image: 'https://via.placeholder.com/400x300',
      category: 'Artesanías',
      stock: 5,
      storeName: 'Artesanías Andres',
      features: ['Tejido a mano', 'Materiales naturales', 'Diseño único', 'Talla ajustable']
    },
    102: {
      id: 102,
      title: 'Bolso artesanal',
      description: 'Bolso elaborado con fibras naturales y técnicas ancestrales. Perfecto para el uso diario con un toque de tradición.',
      price: '$350.00',
      image: 'https://via.placeholder.com/400x300',
      category: 'Artesanías',
      stock: 3,
      storeName: 'Artesanías Andres',
      features: ['Fibras naturales', 'Resistente y duradero', 'Diseño tradicional', 'Hecho a mano']
    },
    201: {
      id: 201,
      title: 'Collar de cuentas',
      description: 'Elegante collar elaborado con cuentas de colores vibrantes. Cada cuenta es seleccionada cuidadosamente para crear patrones únicos.',
      price: '$90.00',
      image: 'https://via.placeholder.com/400x300',
      category: 'Joyería Artesanal',
      stock: 8,
      storeName: 'Manos Creativas',
      features: ['Cuentas de colores', 'Patrones únicos', 'Cierre ajustable', 'Hecho a mano']
    },
    202: {
      id: 202,
      title: 'Sombrero de palma',
      description: 'Sombrero tradicional tejido con hojas de palma natural. Protección solar con estilo y tradición cultural.',
      price: '$220.00',
      image: 'https://via.placeholder.com/400x300',
      category: 'Sombreros',
      stock: 6,
      storeName: 'Manos Creativas',
      features: ['Palma natural', 'Protección UV', 'Transpirable', 'Diseño tradicional']
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProduct(productsDetails[productId]);
    setTab('details');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setTab('products');
  };

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
      ) : tab === 'products' ? (
        <div className="max-w-4xl mx-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="py-3 px-5 text-left font-semibold">Tienda</th>
                <th className="py-3 px-5 text-left font-semibold">Artículo</th>
                <th className="py-3 px-5 text-left font-semibold">Precio</th>
                <th className="py-3 px-5 text-left font-semibold">Acción</th>
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
                  <td className="py-3 px-5">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => handleProductClick(product.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === 'details' && selectedProduct ? (
        <ProductDetailView 
          selectedProduct={selectedProduct} 
          onBack={handleBackToProducts} 
        />
      ) : null}
      
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