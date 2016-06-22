import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'
import Router from './components/router'
import { instance as user } from './lib/user'

import _ from 'underscore'
import s from 'underscore.string'
_.mixin(s.exports())

const store = createStore(reducers, applyMiddleware(thunk))

user.set(JSON.parse(localStorage.user || '{}'))
user.onChange((data) => {
	localStorage.user = JSON.stringify(data)
})

render(
	<Provider store={store}>{Router}</Provider>,
	document.getElementById('app')
)
