import { combineReducers } from 'redux'
import fetchAll from './fetchAll'
import fetch from './fetch'
import create from './create'
import update from './update'
import destroy from './destroy'

export default combineReducers({
	fetchAll,
	fetch,
	create,
	update,
	destroy,
})
