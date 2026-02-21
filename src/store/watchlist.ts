import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistState = {
  watchlist: number[]; 
  addCoin: (id: number) => void; 
  removeCoin: (id: number) => void;
};

const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            watchlist: [],

            addCoin: (id: number) => {
                const currentList = get().watchlist;
                if (!currentList.includes(id)) {
                    set({ watchlist: [...currentList, id] });
                }
            },

            removeCoin: (id: number) => {
                set({ watchlist: get().watchlist.filter((coinId) => coinId !== id) });
            },

            getCoinList: () => {
                return get().watchlist;
            },
        }),
        {
            name: "watchlist-storage", 
            storage: {
                getItem: (name: string) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name: string, value: any) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name: string) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);

export default useWatchlistStore;
