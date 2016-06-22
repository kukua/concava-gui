import { combineReducers } from 'redux'
import error from './error'
import user from './user/'
import device from './device/'
import template from './template/'
import attribute from './attribute/'

export default combineReducers({
	error,
	user,
	device,
	template,
	attribute,
})
