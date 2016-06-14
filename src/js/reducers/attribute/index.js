import { combineReducers } from 'redux'
import fetchByDeviceId from './fetchByDeviceId'
import fetch from './fetch'
import create from './create'
import update from './update'
import destroy from './destroy'

export default combineReducers({
	fetchAll: fetchByDeviceId,
	fetch,
	create,
	update,
	destroy,
})
