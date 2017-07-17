import React from 'react'
import carActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import ListProfileCars from './ListProfileCars'
import toastr from 'toastr'
class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cars: []
    }
    this.handleProfileRetrieved = this.handleProfileRetrieved.bind(this)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleCarDeleted = this.handleCarDeleted.bind(this)
    CarStore.on(
      CarStore.eventTypes.PROFILE_RETRIEVED,
      this.handleProfileRetrieved
    )
    CarStore.on(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeleted
    )
  }
  componentDidMount () {
    carActions.getProfile()
  }
  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.PROFILE_RETRIEVED,
      this.handleProfileRetrieved
    )
    CarStore.removeListener(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeleted
    )
  }
  handleProfileRetrieved (cars) {
    this.setState({cars})
  }
  handleDelete (event) {
    const carId = event.target.value
    carActions.deleteCar(carId)
  }
  handleCarDeleted (data) {
    if (!data.success) {
      toastr.error(data.message)
      return
    }
    toastr.success(data.message)
    carActions.getProfile()
  }
  render () {
    let userCars = 'No cars found'
    if (this.state.cars.length > 0) {
      userCars = this.state.cars.map(car => {
        return (
          <ListProfileCars
            key={car.id}
            {...car}
            delete={this.handleDelete} />
        )
      })
    }
    return (
      <div>
        <h2>User Profile Page</h2>
        {userCars}
      </div>
    )
  }
}

export default ProfilePage
