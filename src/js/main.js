import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'
import Router from './components/router'

const store = createStore(reducers, applyMiddleware(thunk))

render(
	<Provider store={store}>{Router}</Provider>,
	document.getElementById('app')
)
