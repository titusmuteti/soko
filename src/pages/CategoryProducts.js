import React from 'react';

function CategoryProducts({ products, params }) {
  // Extract the category from the route parameters
  const category = params.category;

  // Filter the products that belong to the specified category
  const categoryProducts = products.filter((product) => product.category === category);

  return (
    <div>
      <h2>Products in the {category} category:</h2>
      <ul>
        {categoryProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryProducts;
