import React from "react";

const styles = {
  cardSize: {
    width: "22rem",
  }
};

function CarCard(props) {
  return (
    <div className="card m-2" style={styles.cardSize}>
      <img src={props.image} className="card-img-top w-100" alt="car" />
      <div className="card-body">
        <h4 className="card-title">${props.price} | {props.year} {props.make} {props.model}</h4> 
      </div>
    </div>
  );
}

export default CarCard;
