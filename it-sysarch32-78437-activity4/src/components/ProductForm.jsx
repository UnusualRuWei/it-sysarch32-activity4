import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductForm({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
   // Replace with your actual token

  const isEdit = location.pathname.includes('/edit/'); // Check if it's an edit operation
  const initialProductId = isEdit ? location.pathname.split('/edit/')[1] : null; // Extract productId for edit
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (isEdit && initialProductId) {
      // Fetch existing product data and pre-fill the form fields for editing
      fetchProductData(initialProductId);
    }
  }, [isEdit, initialProductId]);

  const fetchProductData = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching product details: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setName(data.product.name);
      setPrice(data.product.price);

      // If productImage exists, fetch the image and set it
      if (data.product.productImage) {
        setImageSrc('http://localhost:3000/'+ data.product.productImage);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'price':
        setPrice(parseFloat(value)); // Ensure valid number input for price
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('productImage', imageFile);

      const url = isEdit ? `http://localhost:3000/products/${initialProductId}` : 'http://localhost:3000/products';
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json(); // Parse the response as JSON

      if (!response.ok) {
        // Handle non-200 OK responses (errors)
        console.error('Error submitting product:', data);
        // You can display an error message to the user here
      } else {
        console.log('Product submitted successfully:', data);
        // You can display a success message to the user here or potentially reset the form
        navigate('/products'); // Redirect after successful submission
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      // You can display an error message to the user here
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="productImage">Product Image:</label>
        <input
          type="file"
          id="productImage"
          name="productImage"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />

        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </form>

      <h2>Current Product Information</h2>
      <p>Name: {name}</p>
      <p>Price: {typeof price === 'number' ? price.toFixed(2) : price}</p>
      {imageFile ? <img src={URL.createObjectURL(imageFile)} alt="Product" /> : imageSrc && <img src={imageSrc} alt="Product" />}
    </div>
  );
}

export default ProductForm;
