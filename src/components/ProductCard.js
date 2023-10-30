import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function ProductCard ({product, index}) {
    return (
       <Link to={`/products/${index}`} style={{textDecoration:'none'}}>
         <Card style={{width: '12rem', height:'70%'}}>
            <Card.Img variant="top" src={product.image} style={{height: '70%'}}></Card.Img>
            <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text> KSh{product.price} </Card.Text>
            </Card.Body>
        </Card>
       </Link>
    )
}

export default ProductCard;