import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ token }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching product details: ${response.statusText}`);
        }

        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }

      console.log('Product deleted successfully');
      // Redirect to products list or another page after deletion
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = () => {
    // Redirect to product editing form with pre-filled details
    navigate(`/products/edit/${productId}`);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {product && (
        <div>
          <h3>ID: {product._id}</h3>
          <h3>Name: {product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={`http://localhost:3000/${product.productImage}`} alt={product.name} />
        </div>
      )}
      {!isLoading && !product && <p>Product not found.</p>}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      <a href="/products">Back</a>
    </div>
  );
}

export default ProductDetail;
