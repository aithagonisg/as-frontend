import React from "react";

const StarRating = ({ rating, totalStars }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>&#9733;</span>); // filled star
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<span key={i}>&#9734;</span>); // half star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // empty star
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
