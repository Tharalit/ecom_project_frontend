import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { listCategory } from "../APIs/category";
import { listProduct, searchFilters } from "../APIs/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  actionLogin: async (form) => {
    const res = await axios.post(`https://ecom-project-backend-coral.vercel.app/api/login`, form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddToCart: (product) => {
    const carts = get().carts;
    const updatedCart = [...carts, { ...product, count: 1 }];
    // Step unique
    const unique = _.uniqWith(updatedCart, _.isEqual);
    set({ carts: unique });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId ? { ...item, count: Math.max(1, newQuantity) } : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({ carts: state.carts.filter((item) => item.id !== productId) }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => total + item.price * item.count, 0);
  },
  actionClearCart: () => set({ carts: [] }),
  actionLogout: () => {
    set({ user: null, token: null, categories: [], products: [], carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
