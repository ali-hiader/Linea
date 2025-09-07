"use client";

import { addToCart } from "@/actions/cart-actions";
import Spinner from "@/icons/spinner";
import useCartStore from "@/stores/cart_store";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

function AddToCartBtn({ id }: { id: number }) {
  const { addProduct } = useCartStore();
  const [loading, setLoading] = useState(false);

  async function handleAddingToCart() {
    setLoading(true);
    const cartProduct = await addToCart(id);
    addProduct(cartProduct);
    setLoading(false);
    toast.info("Added to Cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      className: "rounded-none",
      closeButton: true,
    });
  }

  return (
    <button
      onClick={handleAddingToCart}
      className="mt-10 w-full border bg-secondary hover:bg-secondary/90 rounded-full transition-all group px-6 py-2 cursor-pointer disabled:cursor-not-allowed relative"
      type="button"
      disabled={loading}
    >
      {loading && (
        <Spinner className="animate-spin size-6 absolute top-2  left-0 translate-x-1/2" />
      )}{" "}
      Add to cart
    </button>
  );
}

export default AddToCartBtn;
