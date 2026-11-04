"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

type FavouriteProviderProps = {
  favouriteIds: Set<string>;
  isFavourite: (productId: string) => boolean;
  setFavourite: (productId: string, isFavourite: boolean) => void;
};

const FavouriteContext = createContext<FavouriteProviderProps | null>(null);

export function FavouriteProvider({
  initialFavouriteIds,
  children,
}: {
  initialFavouriteIds: string[];
  children: React.ReactNode;
}) {
  const [favouriteIds, setFavouriteIds] = useState(
    () => new Set(initialFavouriteIds),
  );

  const isFavourite = useCallback(
    (productId: string) => favouriteIds.has(productId),
    [favouriteIds],
  );

  const setFavourite = useCallback(
    (productId: string, isFavourite: boolean) => {
      setFavouriteIds((prev) => {
        const newSet = new Set(prev);
        if (isFavourite) {
          newSet.add(productId);
        } else {
          newSet.delete(productId);
        }
        return newSet;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ favouriteIds, isFavourite, setFavourite }),
    [favouriteIds, setFavourite],
  );

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourite() {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavourite must be used within a FavouriteProvider");
  }
  return context;
}
