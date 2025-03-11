import { useState, useEffect } from "react";

const useProduct = (user) => {
  const [cart, setCart] = useState(user?.carts || []);
  const [cartCount, setCartCount] = useState(user?.carts.length)

  useEffect(() => {
    setCart(user?.carts || []);
  }, [user]); // Re-run if user changes

  const increaseCart = () => {
    setCart(user.carts); 
    setCartCount(cartCount+1)
  };

  return { cart, increaseCart , cartCount };
};

export default useProduct;
