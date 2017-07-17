import Data from './Data'
const baseUrl = 'cars'
class CarData {
  static create (car) {
    return Data.post(`${baseUrl}/create`, car, true)
  }
  static all (page, search) {
    page = page || 1

    if (search && !page) {
      return Data.get(`${baseUrl}/all?search=${search}`)
    } else if (search && page) {
      return Data.get(`${baseUrl}/all?page=${page}&search=${search}`)
    }
    return Data.get(`${baseUrl}/all?page=${page}`)
  }

  static byId (id) {
    return Data.get(`${baseUrl}/details/${id}`, true)
  }

  static addReview (id, review) {
    return Data.post(`${baseUrl}/details/${id}/reviews/create`, review, true)
  }

  static allReviews (id) {
    return Data.get(`${baseUrl}/details/${id}/reviews`, true)
  }
  static likes (id) {
    return Data.post(`${baseUrl}/details/${id}/like`, {}, true)
  }
  static profile () {
    return Data.get(`${baseUrl}/mine`, true)
  }
  static deleteCar (id) {
    return Data.post(`${baseUrl}/delete/${id}`, {}, true)
  }
}

export default CarData
