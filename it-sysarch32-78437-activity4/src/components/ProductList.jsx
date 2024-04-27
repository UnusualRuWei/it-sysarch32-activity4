import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/ProductList.css'

function ProductList() {
  const [products, setProductList] = useState([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous error

      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProductList(data.product); // Access products directly from data
        console.log('Number of products:', data.count); // Access count from data
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchData();
  }, []);
  
    const handleProductClick = (productId) => {
      navigate(`/products/${productId}`); // Redirect to ProductDetail with ID
    };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products.length > 0 && (
        <div>
            {
                products.map((product) => (
                    <div className='cardHolder' key={product._id}  >
                      <h3>Name: {product.name}</h3>
                      <img src={"http://localhost:3000/"+product.productImage} alt={product.name} /> {/* Added alt text */}
                      <button onClick={() => handleProductClick(product._id)} >Show Details</button>{/* Access request.url */}
                    </div>
                  ))
            }
            <a href='/'>Back</a>
        </div>
      )}
      {!isLoading && products.length === 0 && <p>No products found.</p>}
    </div>
  );
}

export default ProductList;
