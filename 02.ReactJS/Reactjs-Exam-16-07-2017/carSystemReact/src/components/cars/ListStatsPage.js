import React from 'react'
import statActions from '../../actions/StatsActions'
import StatsStore from '../../stores/StatStore'
class ListStatsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stats: {
        cars: 0,
        users: 0
      }
    }
    this.handleStatRetrieved = this.handleStatRetrieved.bind(this)

    StatsStore.on(
      StatsStore.eventTypes.STATISTICS_RETRIEVED,
      this.handleStatRetrieved
    )
  }
  componentDidMount () {
    statActions.all()
  }
  componentWillUnmount () {
    StatsStore.removeListener(
      StatsStore.eventTypes.STATISTICS_RETRIEVED,
      this.handleStatRetrieved
    )
  }
  handleStatRetrieved (stats) {
    this.setState({ stats })
  }
  render () {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Total number of cars and users</p>
        <p>Users - {this.state.stats.users} count</p>
        <p>Cars - {this.state.stats.cars} count</p>
      </div>
    )
  }
}
export default ListStatsPage
