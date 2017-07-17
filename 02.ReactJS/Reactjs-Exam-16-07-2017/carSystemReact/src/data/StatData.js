import Data from './Data'
const baseUrl = 'stats'
class StatData {
  static create (hotel) {
    return Data.post(`${baseUrl}/create`, hotel, true)
  }
  static all () {
    return Data.get(`${baseUrl}`)
  }
}

export default StatData
