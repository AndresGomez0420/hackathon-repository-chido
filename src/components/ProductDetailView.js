import React from 'react';

const ProductDetailView = ({ selectedProduct, onBack }) => {
  if (!selectedProduct) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center font-semibold"
      >
        ← Volver a Artículos
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {selectedProduct.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {selectedProduct.title}
              </h1>
              <p className="text-sm text-blue-600 mt-1">
                Por: {selectedProduct.storeName}
              </p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                {selectedProduct.price}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Stock disponible: {selectedProduct.stock} unidades
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Características</h3>
              <ul className="space-y-2">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold">
                Agregar al Carrito
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-semibold">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
