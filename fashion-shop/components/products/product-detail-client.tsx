"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

import { productDetailItem } from "@/lib/product-type";
import { formatPrice, getCategoryLabel } from "@/lib/product-utils";
import { Badge } from "../ui/badge";
import FavouriteButton from "./favourite-button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { addToCartAction } from "@/app/actions/cart";
import { toast } from "@/components/ui/toast";

type ProductDetailClientProps = {
  product: productDetailItem;
};

function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sizes = useMemo(
    () => [...new Set(product.productVariants.map((variant) => variant.size))],
    [product.productVariants],
  );

  const availableColors = useMemo(() => {
    if (!selectedSize)
      return [
        ...new Set(product.productVariants.map((variant) => variant.color)),
      ]; // return []
    return [
      ...new Set(
        product.productVariants
          .filter((variant) => variant.size === selectedSize)
          .map((variant) => variant.color),
      ),
    ];
  }, [product.productVariants, selectedSize]);

  const selectedVariant = useMemo(() => {
    if (!selectedSize || !selectedColor) return null;
    return product.productVariants.find(
      (variant) =>
        variant.size === selectedSize &&
        variant.color === selectedColor &&
        variant.stock > 0,
    );
  }, [product.productVariants, selectedSize, selectedColor]);

  const displayImage = selectedVariant?.imageUrl ?? product.imageUrl;

  function showToast() {
    const id = toast.add({
      title: "Added to cart",
      description: `You have successfully added the ${product.name} to your cart.`,
      actionProps: {
        // children: "Undo",
        onClick() {
          toast.close(id);
        },
      },
    });
  }

  function handleAddToCart() {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!selectedVariant) {
      setError("Please select a valid size and color.");
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await addToCartAction({
        variantId: selectedVariant.id,
        quantity: 1,
      });

      if (result.success) {
        // router.push("/cart");
        showToast();
      } else if (result.error === "unauthenticated") {
        router.push("/login");
      } else {
        setError(result.error || "Failed to add to cart.");
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-muted relative aspect-3/4 overflow-hidden rounded-xl">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary">
              {getCategoryLabel(product.category)}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>
          <FavouriteButton productId={product.id} />
        </div>
        {product.description && (
          <p className="text-muted-foreground">{product.description}</p>
        )}
        <FieldGroup>
          <Field>
            <FieldLabel>Size</FieldLabel>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Color</FieldLabel>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          {selectedVariant && (
            <FieldDescription>
              {selectedVariant.stock} in stock
            </FieldDescription>
          )}
          {error && (
            <FieldError className="text-destructive">{error}</FieldError>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1"
              disabled={!selectedVariant || isPending}
              onClick={handleAddToCart}
            >
              {isPending ? "Adding..." : "Add to Cart"}
            </Button>
            <Button variant="outline">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}

export default ProductDetailClient;
