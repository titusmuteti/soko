import React from "react";
import ProductCard from "./ProductCard";

function Products ({ productsList }) {
    const displayProducts = productsList.map((product, index) => (
        <div className="col-md-2 mt-0 mb-0" key={index}>
            <ProductCard product={product} index={index} />
        </div>
    ));

    const sectionStyle = {
        backgroundColor: "white",
        maxWidth: "75em",
        margin: "0 auto",
        padding: "25px",
        marginTop: "2em",
    };

    return (
        <section style={sectionStyle}>
            <article className='row'>
                {displayProducts}
            </article>
        </section>
    );
}

export default Products;
