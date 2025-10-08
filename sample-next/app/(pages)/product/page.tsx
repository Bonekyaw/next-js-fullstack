import { Filter, Search, Star } from "lucide-react";

import ProductCard from "@/app/components/productCard";
import { Product } from "@/app/types";

const products: Product[] = [
  {
    id: 1,
    name: "Premium Laptop",
    description:
      "High-performance laptop with latest processor and ample storage. Perfect for professionals and creatives.",
    price: 999.99,
    imageText: "💻",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description:
      "Noise-cancelling wireless headphones with premium sound quality and long battery life.",
    price: 199.99,
    imageText: "🎧",
  },
  {
    id: 3,
    name: "Smart Watch",
    description:
      "Feature-rich smartwatch with health monitoring, notifications, and fitness tracking.",
    price: 299.99,
    imageText: "⌚",
  },
  {
    id: 4,
    name: "Digital Camera",
    description:
      "Professional DSLR camera with multiple lenses and accessories for stunning photography.",
    price: 799.99,
    imageText: "📷",
  },
  {
    id: 5,
    name: "Gaming Console",
    description:
      "Next-gen gaming console with 4K support and extensive game library for ultimate entertainment.",
    price: 499.99,
    imageText: "🎮",
  },
  {
    id: 6,
    name: "Tablet Device",
    description:
      "Versatile tablet perfect for work and entertainment on the go with stunning display.",
    price: 399.99,
    imageText: "📱",
  },
];

export default function ProductPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Our{" "}
            <span className="text-primary-500 dark:text-primary-400">
              Products
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Discover our amazing range of premium products designed to meet your
            needs. All products come with a 30-day money-back guarantee and
            excellent customer support.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 dark:text-white transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-ghost flex items-center space-x-2">
                <Filter size={18} />
                <span>Filter</span>
              </button>
              <button className="btn-ghost flex items-center space-x-2">
                <Star size={18} />
                <span>Sort</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
