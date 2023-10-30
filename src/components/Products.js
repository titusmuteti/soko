import React from "react";
import ProductCard from "./ProductCard";

function Products ({productsList}) {
    const displayProducts = productsList.map(product => 
    <div className="col-md-2 mt-4">
        <ProductCard key={product.id} product={product} index={product.id} />
    </div>)

    return (
        <section className="m-10 mt-1">
            <article className='row'>
                {displayProducts}
            </article>
        </section>
    )
}

export default Products;