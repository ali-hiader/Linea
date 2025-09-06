import { create } from "zustand";
import { CartProduct } from "@/lib/types";

interface CartStore {
  products: CartProduct[];
  setProducts: (products: CartProduct[]) => void;
  addProduct: (product: CartProduct) => void;
  updateQuantity: (productId: number) => void;
  deceraseQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  updateQuantity: (productId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    })),

  deceraseQuantity: (productId) =>
    set((state) => ({
      products: state.products.map((product) => {
        if (product.id === productId) {
          if (product.quantity === 1) {
            return product;
          } else {
            return { ...product, quantity: product.quantity - 1 };
          }
        } else {
          return product;
        }
      }),
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));

export default useCartStore;
