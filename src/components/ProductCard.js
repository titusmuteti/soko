import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    const truncatedText = text.split(' ').slice(0, 3).join(' ');
    return truncatedText + '...';
}

function ProductCard({ product, index }) {
    const truncatedTitle = truncateText(product.title, 3);

    return (
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ width: '12rem', height: '70%' }}>
                <Card.Img variant="top" src={product.image} style={{ height: '70%' }} />
                <Card.Body>
                    <Card.Title className="fs-6">
                        {truncatedTitle}
                    </Card.Title>
                    <Card.Text> KSh{product.price} </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default ProductCard;
