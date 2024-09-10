// Fetch product information from Shopify Admin API
const accessToken = process.env.Shopify_test_token; // Shopify API Access token

async function fetchShopifyProducts() {
  const shop = 'eplehusettest';  // Store's name
  const apiVersion = '2024-07';   // API version
  
  const url = `https://${shop}.myshopify.com/admin/api/${apiVersion}/products.json`;

  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
      }
  });

  if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
  }

  const products = await response.json();
  return products;
}

// Example usage
fetchShopifyProducts()
  .then(products => console.log(products))
  .catch(error => console.error('Error:', error));
  