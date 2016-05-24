import { combineReducers } from 'redux'
import users from './users'
import devices from './devices'
import attributes from './attributes'

export default combineReducers({
	users,
	devices,
	attributes
})
