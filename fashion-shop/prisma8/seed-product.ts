import "dotenv/config";
import { db } from "../lib/prisma";
import type { Numeric } from "@prisma/orm-postgres/target/codec-types";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["Black", "White", "Navy", "Red"];

function numeric10_2(value: string | number): Numeric<10, 2> {
  return String(value) as Numeric<10, 2>;
}

function productImage(slug: string) {
  return `https://picsum.photos/seed/fashion-${slug}/600/800`;
}

type Category = "MEN" | "WOMEN" | "TEENS" | "CHILD" | "KIDS";

type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
};

const products: SeedProduct[] = [
  {
    name: "Classic Oxford Shirt",
    slug: "classic-oxford-shirt",
    description: "Timeless cotton oxford shirt with a relaxed fit.",
    price: 49.99,
    category: "MEN",
  },
  {
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    description: "Comfortable stretch chinos for everyday wear.",
    price: 59.99,
    category: "MEN",
  },
  {
    name: "Wool Blend Blazer",
    slug: "wool-blend-blazer",
    description: "Structured blazer for smart casual occasions.",
    price: 129.99,
    category: "MEN",
  },
  {
    name: "Crew Neck Sweater",
    slug: "crew-neck-sweater",
    description: "Soft merino wool sweater with ribbed cuffs.",
    price: 79.99,
    category: "MEN",
  },
  {
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Medium wash denim jacket with classic styling.",
    price: 89.99,
    category: "MEN",
  },
  {
    name: "Linen Summer Shirt",
    slug: "linen-summer-shirt",
    description: "Breathable linen shirt perfect for warm weather.",
    price: 54.99,
    category: "MEN",
  },
  {
    name: "Floral Midi Dress",
    slug: "floral-midi-dress",
    description: "Elegant floral print dress with a flattering silhouette.",
    price: 89.99,
    category: "WOMEN",
  },
  {
    name: "High-Waist Trousers",
    slug: "high-waist-trousers",
    description: "Tailored high-waist trousers with a clean finish.",
    price: 69.99,
    category: "WOMEN",
  },
  {
    name: "Cashmere Wrap",
    slug: "cashmere-wrap",
    description: "Lightweight cashmere wrap for layering.",
    price: 149.99,
    category: "WOMEN",
  },
  {
    name: "Silk Camisole",
    slug: "silk-camisole",
    description: "Soft silk camisole with adjustable straps.",
    price: 64.99,
    category: "WOMEN",
  },
  {
    name: "Wide Leg Jeans",
    slug: "wide-leg-jeans",
    description: "Relaxed wide-leg jeans in a soft wash.",
    price: 79.99,
    category: "WOMEN",
  },
  {
    name: "Knit Cardigan",
    slug: "knit-cardigan",
    description: "Cozy open-front cardigan with rib detailing.",
    price: 74.99,
    category: "WOMEN",
  },
  {
    name: "Graphic Tee",
    slug: "graphic-tee",
    description: "Soft cotton tee with a bold graphic print.",
    price: 29.99,
    category: "TEENS",
  },
  {
    name: "Cargo Joggers",
    slug: "cargo-joggers",
    description: "Comfortable cargo joggers for everyday wear.",
    price: 44.99,
    category: "TEENS",
  },
  {
    name: "Hooded Sweatshirt",
    slug: "hooded-sweatshirt",
    description: "Fleece hoodie with kangaroo pocket.",
    price: 49.99,
    category: "TEENS",
  },
  {
    name: "Plaid Shirt",
    slug: "plaid-shirt",
    description: "Classic plaid button-down for casual days.",
    price: 39.99,
    category: "TEENS",
  },
  {
    name: "Skater Skirt",
    slug: "skater-skirt",
    description: "Flowy skater skirt with stretch waistband.",
    price: 34.99,
    category: "TEENS",
  },
  {
    name: "Denim Overalls",
    slug: "denim-overalls",
    description: "Playful denim overalls for active kids.",
    price: 44.99,
    category: "CHILD",
  },
  {
    name: "Striped Long Sleeve",
    slug: "striped-long-sleeve",
    description: "Soft striped tee for everyday comfort.",
    price: 24.99,
    category: "CHILD",
  },
  {
    name: "Corduroy Pants",
    slug: "corduroy-pants",
    description: "Durable corduroy pants with adjustable waist.",
    price: 39.99,
    category: "CHILD",
  },
  {
    name: "Rain Jacket",
    slug: "rain-jacket",
    description: "Waterproof jacket for rainy school days.",
    price: 54.99,
    category: "CHILD",
  },
  {
    name: "Soft Play Set",
    slug: "soft-play-set",
    description: "Two-piece soft set for toddlers.",
    price: 29.99,
    category: "KIDS",
  },
  {
    name: "Animal Print Onesie",
    slug: "animal-print-onesie",
    description: "Cozy onesie with fun animal print.",
    price: 22.99,
    category: "KIDS",
  },
  {
    name: "Knit Beanie Set",
    slug: "knit-beanie-set",
    description: "Matching beanie and mittens set.",
    price: 19.99,
    category: "KIDS",
  },
  {
    name: "Everyday Joggers",
    slug: "everyday-joggers-kids",
    description: "Soft joggers for playtime and nap time.",
    price: 27.99,
    category: "KIDS",
  },
  {
    name: "Printed Tee Pack",
    slug: "printed-tee-pack",
    description: "Pack of colorful printed tees.",
    price: 34.99,
    category: "KIDS",
  },
];

function getSizesForCategory(category: Category): string[] {
  if (category === "KIDS") return ["2T", "3T", "4T", "5T"];
  if (category === "CHILD") return ["4", "5", "6", "7", "8"];
  return SIZES;
}

async function main() {
  console.log("Seeding database...");

  await db.orm.public.ProductVariant.where((row) =>
    row.id.isNotNull(),
  ).delete();
  await db.orm.public.Product.where((row) => row.id.isNotNull()).delete();

  for (const product of products) {
    const sizes = getSizesForCategory(product.category);
    const colorSubset = COLORS.slice(0, 3);
    const productId = crypto.randomUUID();

    await db.orm.public.Product.create({
      id: productId,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: numeric10_2(product.price),
      category: product.category,
      imageUrl: productImage(product.slug),
      isActive: true,
    });

    for (const size of sizes) {
      for (const color of colorSubset) {
        await db.orm.public.ProductVariant.create({
          id: crypto.randomUUID(),
          productId,
          size,
          color,
          stock: Math.floor(Math.random() * 20) + 5,
          imageUrl: productImage(product.slug),
        });
      }
    }
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
