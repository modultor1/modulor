import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Formation } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (formation: Formation) => void;
  removeItem: (formationId: string) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (formation) => {
        const exists = get().items.find((i) => i.formation.id === formation.id);
        if (!exists) {
          set((state) => ({
            items: [...state.items, { formation, quantite: 1 }],
          }));
        }
      },

      removeItem: (formationId) =>
        set((state) => ({
          items: state.items.filter((i) => i.formation.id !== formationId),
        })),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, i) => acc + i.formation.prix * i.quantite, 0),

      count: () => get().items.length,
    }),
    { name: "modulor-cart" }
  )
);
