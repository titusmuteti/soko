import React, { useState } from "react";
import './rating.css';

function Rating({product}) {
    // const {rate} = product.rating 
    const [rating, setRating] = useState(product.rating || 0); // Use the rating from the product prop of available

    function handleRating(newRating) {
        setRating(newRating);
    }

    return (
        <div>
        <small>Rating: {rating} stars</small>
        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => handleRating(star)}
            >
                &#9733;
            </span>
            ))}
        </div>
        </div>
    );
}

export default Rating;
