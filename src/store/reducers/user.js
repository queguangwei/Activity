import { Map, List } from 'immutable'
import {
    USER_SYNC_COOKIE_INFO,
} from '../constants/ActionTypes'

const initialState = Map({
  cookieInfo: Map({}),
  assets: Map({}),
  strategyAssets: Map({}),
  logined: true
})

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SYNC_COOKIE_INFO:
        return action.data ? state.set('cookieInfo', Map(action.data)) : state.set('logined', false).set('assets', Map({})).set('strategyAssets', Map({})).set('cookieInfo',Map({}))
    default:
      return state
  }
}
