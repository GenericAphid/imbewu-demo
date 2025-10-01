import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const prevCountRef = useRef(0);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (cartItemsCount > prevCountRef.current) {
      const badge = document.querySelector('[data-cart-badge]');
      if (badge) {
        badge.classList.add('pulse-scale');
        setTimeout(() => {
          badge.classList.remove('pulse-scale');
        }, 400);
      }
    }
    prevCountRef.current = cartItemsCount;
  }, [cartItemsCount]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/catalogue" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <img src="/logo.png" alt="Imbewu Logo" className="h-6 w-6 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Imbewu Farmers Marketplace</h1>
              <p className="text-xs text-gray-500">Fresh Produce Delivered</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            {state.user ? (
              <>
                <Link 
                  to="/catalogue" 
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  Products
                </Link>
                <Link 
                  to="/checkout" 
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  data-cart-icon
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span 
                      data-cart-badge
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    >
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{state.user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;