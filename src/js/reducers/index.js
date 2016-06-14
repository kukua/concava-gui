import { combineReducers } from 'redux'
import user from './user/'
import device from './device/'
import attribute from './attribute/'

export default combineReducers({
	user,
	device,
	attribute,
})
