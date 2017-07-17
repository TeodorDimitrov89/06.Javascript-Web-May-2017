import React from 'react'
import {Link} from 'react-router-dom'

const CarListing = (props) => (
  <li className='car-listing'>
    <img src={props.image} alt={props.make} />
    <br />
    <h4>{props.make}</h4>
    <Link to={`/cars/details/${props.id}`}>More Details</Link>
  </li>
)

export default CarListing
