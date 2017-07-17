import React from 'react'
import CarReviewForm from './CarReviewForm'
import FormHelpers from '../../common/forms/FormHelpers'
import CarStore from '../../../stores/CarStore'
import carActions from '../../../actions/CarActions'
import toastr from 'toastr'
class CarReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newReview: {
        rating: 0,
        comment: ''
      },
      reviews: [],
      likes: [],
      error: ''
    }

    this.handleReviewChange = this.handleReviewChange.bind(this)

    this.handleReviewSave = this.handleReviewSave.bind(this)

    this.handleReviewsRetrieved = this.handleReviewsRetrieved.bind(this)

    this.handleReviewAdded = this.handleReviewAdded.bind(this)
    CarStore.on(
      CarStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdded
    )
    CarStore.on(
      CarStore.eventTypes.REVIEWS_RETRIEVED,
      this.handleReviewsRetrieved
    )
  }
  componentDidMount () {
    carActions.allReviews(this.props.carId)
  }
  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdded
    )

    CarStore.removeListener(
      CarStore.eventTypes.REVIEWS_RETRIEVED,
      this.handleReviewsRetrieved
    )
  }

  handleReviewsRetrieved (reviews) {
    this.setState({ reviews })
  }

  handleReviewAdded (data) {
    if (!data.success) {
      let error = FormHelpers.getFirstError(data)
      this.setState({ error })
    } else {
      const reviews = this.state.reviews
      reviews.push(data.review)
      this.setState({
        reviews
      })
      toastr.success(data.message)
    }
  }
  handleReviewChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'newReview')
  }

  handleReviewSave (event) {
    event.preventDefault()
    const rating = parseInt(this.state.newReview.rating, 10)
    if (!rating || rating < 1 || rating > 5) {
      this.setState({
        error: 'Rating must be between 1 and 5'
      })
      return
    }
    carActions.addReview(this.props.carId, this.state.newReview)
  }

  render () {
    let reviews = 'No reviews available'
    if (this.state.reviews.length > 0) {
      reviews = this.state.reviews.map((review, index) => (
        <div key={index}>{review.user} {review.rating} - {review.comment}</div>
      ))
    }
    return (
      <div>
        <h4>Share Your Opinion</h4>
        <CarReviewForm
          review={this.state.newReview}
          error={this.state.error}
          onChange={this.handleReviewChange}
          onSave={this.handleReviewSave} />

        {/* <button onClick={this.handleLikeChange} value={`${this.props.carId}`}>{this.state.likes} Like</button> */}
        <div>{reviews}</div>
      </div>
    )
  }
}

export default CarReviews
