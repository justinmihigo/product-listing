import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  count:number;
  description: string;
  rating: number;
  countItems: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
      } catch (e) {
        console.error("Failed to load cart data", e);
      }
    };
    fetchCartData();
  }, []);

  const addToCart = async (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, countItems: item.countItems + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, countItems: 1 }];
    }
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = async (productId: number) => {
    const existingProduct = cart.find((item) => item.id === productId);
    let updatedCart;
    if (existingProduct && existingProduct.countItems > 1) {
      updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, countItems: item.countItems - 1 } : item
      );
    } else {
      updatedCart = cart.filter((item) => item.id !== productId);
    }
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

// import { PropsWithChildren, useContext, createContext, useState} from "react"

// export const CartContext=createContext<any>(null);
// export default function Counter({children}:{children:React.ReactNode}){
//     const [cart, setCart] = useState([]);
//   const value= {
//     cart,
//     setCart,
//   };
//     return(
//         <CartContext.Provider value={value}>
//             {children}
//          </CartContext.Provider>
//     )
    
// }