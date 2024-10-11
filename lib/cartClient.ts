// cartClient.ts

export interface CartItem {
    product_id: number;
    quantity: number;
    // Add other product details if needed
  }
  
  const CART_KEY = 'cart_items';
  
  export const addToCartLocal = (productId: number, quantity: number) => {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const existingItem = cartItems.find(item => item.product_id === productId);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product_id: productId, quantity });
    }
  
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  };
  
  export const getCartItemsLocal = (): CartItem[] => {
    return JSON.parse(localStorage.getItem("cart_items") || '[]');
  };
  
  export const removeFromCartLocal = (productId: number) => {
    let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    cartItems = cartItems.filter((item: CartItem) => item.product_id !== productId);
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  };
  
  
  export const updateCartItemQuantityLocal = (productId: number, quantity: number) => {
    const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
  
    const itemIndex = cartItems.findIndex((item: CartItem) => item.product_id === productId);
  
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
      return true
    }

    return false;
  };
  
  
  export const getCartTotalLocal = () => {
    const cartItems = getCartItemsLocal();
    // You might need to fetch product prices from the server or include them in localStorage
    // For simplicity, assume you have product prices in localStorage or hardcoded
    let total = 0;
    cartItems.forEach(item => {
      const productPrice = getProductPrice(); // Implement this function
      total += item.quantity * productPrice;
    });
    return total;
  };
  
  // Helper function to get product price (implement accordingly)
  const getProductPrice = () => {
    // Fetch product price from server or from a local cache
    return 0; // Placeholder
  };
  