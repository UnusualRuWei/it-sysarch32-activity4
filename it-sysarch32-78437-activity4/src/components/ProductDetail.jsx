import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters


function ProductDetail() {
  const [product, setProduct] = useState(null); // Store the individual product
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const { productId } = useParams(); // Access the product ID from URL parameters

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous error

      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching product details: ${response.statusText}`); // Handle specific errors
        }

        setProduct(data.product); // Access and set the individual product
        console.log('Product details:', data.product);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchData();
  }, [productId]); // Re-run useEffect when productId changes

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {product && ( // Check if product is available before rendering
        <div>
          <h3>ID: {product._id}</h3>
          <h3>Name: {product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={"http://localhost:3000/" + product.productImage} alt={product.name} />
        </div>
      )}
      {!isLoading && !product && <p>Product not found.</p>} {/* Handle case where product is not found */}
      <a href="/products">Back</a>
    </div>
  );
}

export default ProductDetail;
