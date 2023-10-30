import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard ({product}) {
    return (
       <a href="#" style={{textDecoration:'none'}}>
         <Card style={{width: '12rem', height:'70%'}}>
            <Card.Img variant="top" src={product.image} style={{height: '70%'}}></Card.Img>
            <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text> KSh{product.price} </Card.Text>
                {/* <Button variant="primary">Button</Button> */}
            </Card.Body>
        </Card>
       </a>
    )
}

export default ProductCard;