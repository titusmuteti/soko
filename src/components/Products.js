import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import "./product.css";

function Products({ productsList }) {
  const categories = [...new Set(productsList.map((product) => product.category))];
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const handleShowPopup = (message) => {
    toast.info(message);
  };

  return (
    <section className="sectionStyle">
      {categories.map((category) => {
        const categoryProducts = productsList.filter(
          (product) => product.category === category
        );

        const isExpanded = expandedCategories.includes(category);
        const visibleProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, 5);

        const hiddenProductsCount = categoryProducts.length - visibleProducts.length;

        return (
          <div key={category} className="category">
            <h4 className="categoryHeading">
              {category}
              <button
                className="showMoreButton"
                onClick={() => {
                  if (hiddenProductsCount === 0 && !isExpanded) {
                    handleShowPopup("No more products to display");
                  } else {
                    toggleCategory(category);
                  }
                }}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </h4>
            <div className="productCardContainer">
              {isExpanded ? (
                categoryProducts.map((product, index) => (
                  <div key={index} className="productCard">
                    <ProductCard product={product} index={index} />
                  </div>
                ))
              ) : (
                visibleProducts.map((product, index) => (
                  <div key={index} className="productCard">
                    <ProductCard product={product} index={index} />
                  </div>
                ))
              )}
            </div>
            <hr />
          </div>
        );
      })}
    </section>
  );
}

export default Products;
