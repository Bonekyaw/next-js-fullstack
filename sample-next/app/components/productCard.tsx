import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl hover:-translate-y-2 animate-fade-in">
      <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold transition-colors duration-300">
        {product.imageText}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-accent-500 font-bold text-lg">
            ${product.price}
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            {"★".repeat(5)}
          </div>
        </div>
        <button className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-primary-600 hover:shadow-lg cursor-pointer dark:bg-primary-600 dark:hover:bg-primary-500 w-full items-center justify-center space-x-2">
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
