import React, { useState } from 'react';

function ProductForm() {
  const [name, setName] = useState('null');
  const [price, setPrice] = useState(0);
  const [productImage, setProductImage] = useState(null); // Adjust path if needed

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'price':
        setPrice(parseFloat(value)); // Ensure valid number input for price
        break;
      case 'productImage':
        setProductImage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        name,
        price,
        productImage,
      };

      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the response as JSON

      if (!response.ok) {
        // Handle non-200 OK responses (errors)
        console.error('Error submitting product:', data);
        // You can display an error message to the user here
      } else {
        console.log('Product submitted successfully:', data);
        // You can display a success message to the user here or potentially reset the form
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      // You can display an error message to the user here
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      <form>
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

        <label htmlFor="productImage">Product Image (URL):</label>
        <input
          type="text"
          id="productImage"
          name="productImage"
          value={productImage}
          onChange={handleInputChange}
        />
        <br />

        {/* Add a button for potential form submission or other actions */}
        <button type="submit">Submit</button>
      </form>

      <h2>Current Product Information</h2>
      <p>Name: {name}</p>
      <p>Price: {price.toFixed(2)}</p>  {/* Format price with two decimal places */}
      <img src={productImage} alt={name} />
    </div>
  );
}

export default ProductForm;
