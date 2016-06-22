import { combineReducers } from 'redux'
import fetchByTemplateId from './fetchByTemplateId'
import fetch from './fetch'
import create from './create'
import update from './update'
import destroy from './destroy'
import reorder from './reorder'

export default combineReducers({
	fetchAll: fetchByTemplateId,
	fetch,
	create,
	update,
	destroy,
	reorder,
})
