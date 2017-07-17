import React from 'react'
import carActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import CarReviews from './reviews/CarReviews'
import toastr from 'toastr'
class CarDetailsPage extends React.Component {
  constructor (props) {
    super(props)
    const id = this.props.match.params.id
    this.state = {
      id,
      car: {},
      users: []
    }

    this.handleCarRetrieved = this.handleCarRetrieved.bind(this)
    this.handleCarLiked = this.handleCarLiked.bind(this)
    CarStore.on(
      CarStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved
    )
    CarStore.on(
      CarStore.eventTypes.CAR_LIKED,
      this.handleCarLiked
    )
  }
  componentDidMount () {
    carActions.byId(this.state.id)
  }
  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved
    )
    CarStore.removeListener(
      CarStore.eventTypes.CAR_LIKED,
      this.handleCarLiked
    )
  }
  handleCarLiked (car) {
    if (!car.success) {
      toastr.error(car.message)
      return
    }
    toastr.success(car.message)
    this.setState({ car })
    carActions.byId(this.state.id)
  }
  handleLikeChange (event) {
    let id = event.target.value
    carActions.likes(id)
  }

  handleCarRetrieved (car) {
    this.setState({car})
  }
  render () {
    const car = this.state.car
    return (
      <div className='car-details'>
        <h2>{car.make} - {car.model}</h2>
        <h3>{car.year} year car engine - ({car.engine})</h3>
        <div>
          <img src={car.image} alt={car.make} />
        </div>
        <span>Price: {car.price} $</span>
        <p>Mileage: {car.mileage}</p>
        <button onClick={this.handleLikeChange} value={`${this.state.id}`}>{this.state.car.likes} Like</button>
        <div>
          <CarReviews
            carId={this.state.id} />
        </div>
      </div>
    )
  }
}

export default CarDetailsPage
