import React from 'react';

function ProductSpecification ({product}) {
    return(
        <div className="card container d-flex justify-content-center mt-5">
            <h6 style={{ textAlign: "center" }}>Product Details</h6>
            <hr />
            <h5>
                Description: 
                <span style={{ display: "block", marginLeft: "1em" }}>
                <h6>{product.description}</h6>
                </span>
            </h5>
            <h5>
                Category
                <span style={{ display: "block", marginLeft: "1em" }}>
                <h6>{product.category}</h6>
                </span>
            </h5>
            <hr />
            <h5>
                Specification:
                <span style={{ display: "block", marginLeft: "1em" }}>
                <h6>made in-</h6>
                </span>
            </h5>
            <hr />
        </div>

    )
}

export default ProductSpecification;