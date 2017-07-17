import React from 'react'

const ListProfileCars = (props) => (
  <li className='car-listing'>
    <img src={props.image} alt={props.make} />
    <br />
    <h4>Make: {props.make}</h4>
    <p>Model: {props.model}</p>
    <p>Year: {props.year}</p>
    <p>Mileage: {props.mileage}</p>
    <button onClick={props.delete} value={props.id}>Delete</button>
  </li>
)

export default ListProfileCars
