import React, { useState, useEffect } from 'react';

function OrderDetails({ orderId }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                    headers: {
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }

                const data = await response.json();
                setOrder(data.order);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleDelete = async () => {
        setDeleting(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            setSuccessMessage('Order deleted successfully');
            setOrder(null); // Clear order details after deletion
        } catch (error) {
            setError(error.message);
        } finally {
            setDeleting(false);
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
            {order && (
                <div>
                    <h2>Order Detail</h2>
                    <p>Order ID: {order._id}</p>
                    <p>Product ID: {order.product._id}</p>
                    <p>Product Name: {order.product.name}</p>
                    <p>Quantity: {order.quantity}</p>
                    <button onClick={handleDelete} disabled={deleting}>Delete Order</button>
                </div>
            )}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default OrderDetails;
