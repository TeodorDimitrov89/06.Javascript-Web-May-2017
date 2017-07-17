import React from 'react'
import carActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import CarListing from './CarListing'
import queryString from 'query-string'
import FormHelpers from '../common/forms/FormHelpers'

class ListCarPage extends React.Component {
  constructor (props) {
    super(props)
    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1
    this.state = {
      page,
      cars: [],
      search: {
        search: ''
      }
    }
    this.handleCarsRetrieved = this.handleCarsRetrieved.bind(this)
    this.goToPrevPage = this.goToPrevPage.bind(this)
    this.goToNextPage = this.goToNextPage.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    CarStore.on(
      CarStore.eventTypes.CARS_RETRIEVED,
      this.handleCarsRetrieved
    )
  }
  componentDidMount () {
    carActions.all(this.state.page)
  }
  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CARS_RETRIEVED,
      this.handleCarsRetrieved
    )
  }

  handleSearchChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'search')
  }

  handleSearch (event) {
    event.preventDefault()
    this.props.history.push(`/cars/all/page=${this.state.page}&search=${this.state.search.search}`)
    carActions.all(this.state.page, this.state.search.search)
  }

  handleCarsRetrieved (cars) {
    this.setState({ cars })
  }
  goToPrevPage () {
    let page = this.state.page
    if (page === 1) {
      return
    }
    page--
    this.setState({ page })
    carActions.all(page)
    this.props.history.push(`/cars/all?page=${page}`)
  }
  goToNextPage () {
    let page = this.state.page
    if (this.state.cars.length === 0) {
      return
    }
    page++
    this.setState({ page })
    carActions.all(page)
    this.props.history.push(`/cars/all?page=${page}`)
  }

  render () {
    let cars = 'No cars found'
    if (this.state.cars.length > 0) {
      cars = this.state.cars.map(car => {
        return (
          <CarListing
            key={car.id}
            {...car} />
        )
      })
    }
    return (
      <div>
        <h2>All Cars</h2>
        <form>
          <input type='text' name='search' onChange={this.handleSearchChange} />
          <input type='submit' value='search' onClick={this.handleSearch} />
        </form>
        <div>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </div>
        <ul>{cars}</ul>
      </div>
    )
  }
}

export default ListCarPage
