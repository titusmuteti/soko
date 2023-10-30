import React from 'react';

function ProductSpecification ({product}) {
    return(
        <div className=" card container d-flex justify-content-center mt-5">
            <h6 style={{textAlign:"center"}}>Product Details</h6>
            <hr/>
            <h5>Description: 
                {<h6>{product.description}</h6>}
            </h5>
            <h5>
                Specification:
                <h6>made in-</h6>
            </h5>
            <hr/>
        </div>
    )
}

export default ProductSpecification;