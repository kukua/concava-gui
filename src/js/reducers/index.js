import { combineReducers } from 'redux'
import devices from './devices'
import attributes from './attributes'

export default combineReducers({
	devices,
	attributes
})
