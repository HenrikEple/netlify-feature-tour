// src/components/ShopifyProducts.jsx
import React, { useState, useEffect } from 'react';

const ShopifyProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the Netlify function
        const fetchProducts = async () => {
            try {
                console.log("Running JSX")
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

        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Shopify Products</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShopifyProducts;