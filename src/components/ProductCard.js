import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard ({product}) {
    return (
        <Card style={{width: '12rem', height:'100%'}}>
            <Card.Img variant="top" src={product.image}></Card.Img>
            <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text> ${product.price} </Card.Text>
                {/* <Button variant="primary">Button</Button> */}
            </Card.Body>
        </Card>
    )
}

export default ProductCard;