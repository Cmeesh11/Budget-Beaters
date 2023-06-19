import React from "react";


function CarCard(props) {
  return (
    <div className="card m-2">
      <img src={props.image} className='card-img-top' alt="car"></img>
      <div className="card-body">
        <h4 className="card-title">${props.price} | {props.year} {props.make} {props.model}</h4> 
      </div>
    </div>
  );
}

export default CarCard;