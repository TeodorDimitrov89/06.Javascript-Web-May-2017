import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import statsActions from '../actions/StatsActions'
import StatData from '../data/StatData'
class StatsStore extends EventEmitter {
  all () {
    StatData
      .all()
      .then(data => this.emit(this.eventTypes.STATISTICS_RETRIEVED, data))
  }
  handleActions (action) {
    switch (action.type) {
      case statsActions.types.ALL_STATISTICS: {
        this.all()
        break
      }
      default: break
    }
  }
}
let statsStore = new StatsStore()

statsStore.eventTypes = {
  STATISTICS_RETRIEVED: 'statistics_retrieved'
}

dispatcher.register(statsStore.handleActions.bind(statsStore))

export default statsStore
