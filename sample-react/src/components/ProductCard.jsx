const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">{product.imageText}</div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
        <button className="btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
