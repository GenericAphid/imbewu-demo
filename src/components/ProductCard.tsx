import React, { useState } from 'react';
import { Plus, MapPin, Check } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Create floating animation element
    const floatingItem = document.createElement('div');
    floatingItem.innerHTML = `
      <div class="flex items-center justify-center bg-emerald-600 text-white px-3 py-2 rounded-lg shadow-lg">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span class="text-sm font-medium">+1</span>
      </div>
    `;
    floatingItem.style.position = 'fixed';
    floatingItem.style.left = `${rect.left + rect.width / 2}px`;
    floatingItem.style.top = `${rect.top}px`;
    floatingItem.style.transform = 'translate(-50%, -50%)';
    floatingItem.style.zIndex = '9999';
    floatingItem.style.pointerEvents = 'none';
    floatingItem.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    document.body.appendChild(floatingItem);
    
    // Get cart icon position
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Trigger animation
      requestAnimationFrame(() => {
        floatingItem.style.left = `${cartRect.left + cartRect.width / 2}px`;
        floatingItem.style.top = `${cartRect.top + cartRect.height / 2}px`;
        floatingItem.style.opacity = '0';
        floatingItem.style.transform = 'translate(-50%, -50%) scale(0.3)';
      });
      
      // Trigger cart icon animation
      cartIcon.classList.add('cart-bounce');
      setTimeout(() => {
        cartIcon.classList.remove('cart-bounce');
      }, 600);
    }
    
    // Clean up floating element
    setTimeout(() => {
      document.body.removeChild(floatingItem);
    }, 800);
    
    // Button feedback animation
    setIsAdding(true);
    setShowSuccess(true);
    
    dispatch({ type: 'ADD_TO_CART', payload: product });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <span className="text-xl font-bold text-emerald-600">R{product.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">{product.origin}</span>
          </div>
          <span className="text-sm text-gray-500">per {product.unit}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            showSuccess 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          } ${
            isAdding ? 'scale-95' : 'scale-100'
          } text-white transform`}
        >
          {showSuccess ? (
            <>
              <Check className="h-4 w-4 animate-bounce" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;