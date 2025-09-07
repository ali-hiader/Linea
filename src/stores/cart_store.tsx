import { create } from "zustand";
import { CartProduct } from "@/lib/types";

interface CartStore {
  products: CartProduct[];
  setProducts: (products: CartProduct[]) => void;
  addProduct: (product: CartProduct) => void;
  updateQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
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

  decreaseQuantity: (productId) =>
    set((state) => {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return state;

      if (product.quantity === 1) {
        return {
          products: state.products.filter((p) => p.id !== productId),
        };
      } else {
        return {
          products: state.products.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
          ),
        };
      }
    }),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));

export default useCartStore;
