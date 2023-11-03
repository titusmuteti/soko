import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import './product.css';

function Products({ productsList }) {
  const categories = [...new Set(productsList.map((product) => product.category))];
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="sectionStyle">
      {categories.map((category) => {
        const categoryProducts = productsList
          .filter((product) => product.category === category)
          .slice(0, showAll ? undefined : 5);

        return (
          <div key={category} className="category">
            <h4 className="categoryHeading">
              {category}
              <Link to={`/products/${category}`}>
                <button className="showMoreButton">See All</button>
              </Link>
            </h4>
            <div className="productCardContainer">
              {categoryProducts.map((product, index) => (
                <div key={index} className="productCard">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
            <hr />
          </div>
        );
      })}
    </section>
  );
}

export default Products;
