import dispatcher from '../dispatcher/dispatcher'

const statActions = {
  types: {
    ALL_STATISTICS: 'ALL_STATISTICS'
  },
  all () {
    dispatcher.dispatch({
      type: this.types.ALL_STATISTICS
    })
  }
}

export default statActions
