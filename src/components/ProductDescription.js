import React from 'react'

function ProductDescription({product}) {
  return (
    <div className="card" style={{ maxWidth: '540px' }}>
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={product.image}
          alt="..."
          className="img-fluid"
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            {product.description}
            {product.price}
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductDescription