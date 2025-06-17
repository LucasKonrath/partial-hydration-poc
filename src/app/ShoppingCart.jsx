'use client';

import { useState, useEffect } from 'react';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate totals whenever cart changes
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalItems(items);
    setTotalPrice(price);
  }, [cartItems]);

  const addToCart = (game) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === game.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === game.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId) => {
    setCartItems(prev => prev.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(gameId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === gameId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <>
      {/* Cart Icon - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          🛒
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">🛒 Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <div className="text-6xl mb-4">🕹️</div>
                    <p>Your cart is empty</p>
                    <p className="text-sm mt-2">Add some retro games to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-700 rounded flex-shrink-0">
                            {/* Placeholder for game image */}
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🎮
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-xs">{item.platform}</p>
                            <p className="text-green-400 font-bold">${item.price}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-white font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-700 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-green-400">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200">
                    💳 Checkout ({totalItems} items)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
