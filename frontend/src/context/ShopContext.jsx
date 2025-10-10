import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ---------------- Add to Cart ----------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Update local cart
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    // Update backend if logged in
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item added to cart!");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);

        // Revert local cart if backend fails
        const revertCart = structuredClone(cartItems);
        revertCart[itemId][size] -= 1;
        setCartItems(revertCart);
      }
    }
  };

  // ---------------- Get Cart Count ----------------
  const getCartCount = () => {
    let totalCount = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        totalCount += cartItems[id][size] || 0;
      }
    }
    return totalCount;
  };

  // ---------------- Update Quantity ----------------
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  // ---------------- Get Total Amount ----------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;
      for (const size in cartItems[id]) {
        totalAmount += product.price * cartItems[id][size];
      }
    }
    return totalAmount;
  };

  // ---------------- Fetch Products ----------------
  const getProductsData = async () => {
    if (!backendUrl) {
      console.error("VITE_BACKEND_URL is not defined in .env");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ---------------- Get User Cart from Backend ----------------
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ---------------- Load Data ----------------
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, [token]);

  // ---------------- Context Value ----------------
  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
