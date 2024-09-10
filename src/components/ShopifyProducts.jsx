// src/components/ShopifyProducts.jsx
import React, { useState, useEffect } from 'react';

const ShopifyProducts = () => {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/.netlify/functions/fetch-shopify-products');
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data.products); // Adjust to match the actual data structure
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (showProducts) {
            fetchProducts(); // Only fetch products when showProducts is true
        }
    }, [showProducts]);

    return (
        <div>
            <h1>Shopify Products</h1>
            <button onClick={() => setShowProducts(true)}>Show Shopify Products</button>
            {showProducts ? (
                error ? (
                    <div>Error: {error}</div>
                ) : (
                    products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <li key={product.id}>{product.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )
                )
            ) : null}
        </div>
    );
};

export default ShopifyProducts;