import React, { useState, useEffect } from 'react';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ product: '', quantity: '' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders', {
                    headers: {
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.order);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            setFormData({ product: '', quantity: '' });
            const newOrder = await response.json();
            setOrders([...orders, newOrder.createdOrder]);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Order List</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="product">Product ID:</label>
                <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} />
                <label htmlFor="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                <button type="submit">Create Order</button>
            </form>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Product ID: {order.product._id}</p>
                        <p>Product Name: {order.product.name}</p>
                        <p>Quantity: {order.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
