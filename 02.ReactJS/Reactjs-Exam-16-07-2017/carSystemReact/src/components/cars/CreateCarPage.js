import React from 'react'
import CreateCarForm from './CreateCarForm'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import carActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import toastr from 'toastr'
class CreateCarPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      car: {
        make: '',
        model: '',
        year: '',
        engine: '',
        price: 0,
        image: '',
        mileage: 0
      },
      error: ''
    }
    this.handleCarChange = this.handleCarChange.bind(this)
    this.handleCarSave = this.handleCarSave.bind(this)
    this.handleCarCreated = this.handleCarCreated.bind(this)

    CarStore.on(CarStore.eventTypes.CAR_CREATED,
    this.handleCarCreated)
  }
  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_CREATED,
      this.handleCarCreated
    )
  }

  handleCarCreated (data) {
    if (!data.success) {
      let error = FormHelpers.getFirstError(data)
      this.setState({ error })
    } else {
      let carId = data.car.id
      toastr.success(data.message)
      this.props.history.push(`/cars/details/${carId}`)
    }
  }

  handleCarChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'car')
  }
  handleCarSave (event) {
    event.preventDefault()
    if (!this.validateCreateCar()) {
      return
    }
    const car = this.state.car
    carActions.createCar(car)
  }
  validateCreateCar () {
    const car = this.state.car
    return ValidateHelpers.validateCreateCar.bind(this)(car)
  }
  render () {
    return (
      <div>
        <h1>Create Car</h1>
        <CreateCarForm
          car={this.state.car}
          error={this.state.error}
          onChange={this.handleCarChange}
          onSave={this.handleCarSave} />
      </div>
    )
  }
}

export default CreateCarPage
