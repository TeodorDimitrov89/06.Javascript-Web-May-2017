class ValidateHelpers {
  static validateRegisterUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4 || user.confirmPassword.length < 4) {
      error = 'Password and confirm password must have at least 4 characters.'
      formIsValid = false
    }
    if (user.password !== user.confirmPassword) {
      error = 'Password or confirm password do not match.'
      formIsValid = false
    }

    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
  static validateLoginUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4) {
      error = 'Password must have at least 4 characters.'
      formIsValid = false
    }
    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
  static validateCreateCar (car) {
    let error = ''
    let formIsValid = true
    if (!car.make || car.make.length < 3 || typeof car.make !== 'string') {
      error = 'Make must be more than 3 symbols.'
      formIsValid = false
    }
    if (!car.model || car.model.length < 3) {
      error = 'Model must be more than 3 symbols.'
      formIsValid = false
    }
    if (!car || !car.year || car.year < 1950 || car.year > 2050) {
      error = 'Year must be between 1950 and 2050.'
      formIsValid = false
    }
    if (!car.image) {
      error = 'Image URL is required.'
      formIsValid = false
    }
    if (!car.engine || car.engine.length < 1 || typeof car.engine !== 'string') {
      error = 'Engine must be more than 1 symbol.'
      formIsValid = false
    }
    if (!car.price || car.price < 0) {
      error = 'Price must be a positive number.'
      formIsValid = false
    }
    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
}

export default ValidateHelpers
