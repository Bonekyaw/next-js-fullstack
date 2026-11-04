"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { HeartIcon } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFavourite } from "@/components/providers/favourite-provider";
import { toggleFavouriteAction } from "@/app/actions/favourites";

type FavouriteButtonProps = {
  productId: string;
  className?: string;
};

function FavouriteButton({ productId, className }: FavouriteButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { isFavourite, setFavourite } = useFavourite();
  const favourite = isFavourite(productId);

  function handleToggleFavourite() {
    if (!session) {
      router.push("/login");
      return;
    }

    const previouslyFavourite = favourite;
    const newFavouriteState = !previouslyFavourite;
    setFavourite(productId, newFavouriteState);

    startTransition(async () => {
      try {
        const res = await toggleFavouriteAction({ productId });
        if (!res.success) {
          setFavourite(productId, previouslyFavourite);
          if (res.error == "authenticated") {
            router.push("/login");
            return;
          }
          return;
        }

        const confirmed = res.data?.isFavourite ?? newFavouriteState;
        if (confirmed !== newFavouriteState) {
          setFavourite(productId, confirmed);
        }
        // router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className={cn("rounded-full", className)}
      aria-pressed={favourite}
      aria-busy={isPending}
      onClick={handleToggleFavourite}
    >
      <HeartIcon
        className={cn("h-4 w-4", favourite && "fill-red-500 text-red-500")}
      />
    </Button>
  );
}

export default FavouriteButton;
