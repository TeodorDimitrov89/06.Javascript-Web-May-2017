import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import ListStatsPage from '../../cars/ListStatsPage'
import CreateCarPage from '../../cars/CreateCarPage'
import ListCarsPage from '../../cars/ListCarsPage'
import CarDetails from '../../cars/CarDetailsPage'
import ProfilePage from '../../cars/ProfilePage'
import LogoutPage from '../../users/LogoutPage'
const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={ListStatsPage} />
    <Route path='/users/login' component={LoginPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/cars/all' component={ListCarsPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/create' component={CreateCarPage} />
    <PrivateRoute path='/cars/details/:id' component={CarDetails} />
    <PrivateRoute path='/cars/mine' component={ProfilePage} />
  </Switch>
)

export default Routes
