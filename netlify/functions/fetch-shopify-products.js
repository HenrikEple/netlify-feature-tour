
const fetch = require('node-fetch');  // If needed in Node.js

exports.handler = async function(event, context) {
    const shop = 'eplehusettest';  // Store's name
    const apiVersion = '2024-07';   // API version
    const accessToken = process.env.Shopify_test_token;

    const url = `https://${shop}.myshopify.com/admin/api/${apiVersion}/products.json`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken
            }
        });
        console.log("Running Function")
        console.log(response)
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: `Error: ${response.statusText}`,
            };
        }

        const products = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error fetching Shopify products: ${error.message}`,
        };
    }
};