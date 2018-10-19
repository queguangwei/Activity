import {
  GLOBAL_SWITCH_LOGIN_VISIBLE
} from '../constants/ActionTypes'
import { Map } from 'immutable'

const initialState = Map({
  loginVisible: false
})

export default function global(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_SWITCH_LOGIN_VISIBLE:
        return state.set('loginVisible', action.visible)
    default:
      return state
  }
}
