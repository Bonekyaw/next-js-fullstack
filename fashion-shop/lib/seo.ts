import type { Metadata } from "next";
import { getCategoryLabel } from "@/lib/product-utils";
import type { CategoryValue } from "@/lib/product-utils";
import type { productDetailItem } from "@/lib/product-type";

export const SITE_NAME = "Fashion Shop";
export const SITE_DESCRIPTION =
  "Browse and shop the latest fashion for Men, Women, Teens, Child, and Kids";

export function getSiteUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
    process.env.BETTER_AUTH_URL;

  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "fashion",
    "clothing",
    "online shop",
    "men",
    "women",
    "teens",
    "kids",
    "apparel",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export function homeMetadata(category?: CategoryValue): Metadata {
  if (!category) {
    return {
      title: "Shop Collection",
      description: SITE_DESCRIPTION,
      alternates: { canonical: absoluteUrl("/") },
      openGraph: {
        title: `Shop Collection | ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        url: absoluteUrl("/"),
      },
    };
  }

  const label = getCategoryLabel(category);
  const title = `${label} Fashion`;
  const description = `Shop the latest ${label.toLowerCase()} fashion at ${SITE_NAME}.`;
  const url = absoluteUrl(`/?category=${category}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
    },
  };
}

export function productMetadata(product: productDetailItem): Metadata {
  const title = product.name;
  const description =
    product.description?.trim() ||
    `${product.name} — ${getCategoryLabel(product.category)} fashion at ${SITE_NAME}.`;
  const url = absoluteUrl(`/products/${product.slug}`);
  const images = product.imageUrl
    ? [{ url: product.imageUrl, alt: product.name }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

export function productJsonLd(product: productDetailItem) {
  const inStock = product.productVariants.some((variant) => variant.stock > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description?.trim() || `${product.name} from ${SITE_NAME}`,
    image: [product.imageUrl],
    sku: product.id,
    category: getCategoryLabel(product.category),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  };
}
