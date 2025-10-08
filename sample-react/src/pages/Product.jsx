import ProductCard from "../components/ProductCard";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Premium Laptop",
      description:
        "High-performance laptop with latest processor and ample storage.",
      price: 999.99,
      imageText: "Laptop Image",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description:
        "Noise-cancelling wireless headphones with premium sound quality.",
      price: 199.99,
      imageText: "Headphones Image",
    },
    {
      id: 3,
      name: "Smart Watch",
      description:
        "Feature-rich smartwatch with health monitoring and notifications.",
      price: 299.99,
      imageText: "Smart Watch Image",
    },
    {
      id: 4,
      name: "Digital Camera",
      description:
        "Professional DSLR camera with multiple lenses and accessories.",
      price: 799.99,
      imageText: "Camera Image",
    },
    {
      id: 5,
      name: "Gaming Console",
      description:
        "Next-gen gaming console with 4K support and extensive game library.",
      price: 499.99,
      imageText: "Console Image",
    },
    {
      id: 6,
      name: "Tablet Device",
      description:
        "Versatile tablet perfect for work and entertainment on the go.",
      price: 399.99,
      imageText: "Tablet Image",
    },
  ];

  return (
    <div>
      <h1>Our Products</h1>
      <p>
        Check out our amazing range of products designed to meet your needs. All
        products come with a 30-day money-back guarantee and excellent customer
        support.
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
