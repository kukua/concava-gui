import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

/* Default views */
import Layout  from './layout/Master'
import NoMatch from './NoMatch'
import AuthLogin from './auth/Login'
import AuthRegister from '../components/auth/Register'

import Device from './devices/Create'
import DeviceUpdate from './devices/Update'
import DeviceList from '../containers/DeviceList'

import AttributeUpdate from '../components/attributes/Update'

function requireAuthentication(nextState, replace) {
	if (localStorage.token == undefined) {
		replace('/auth/login')
	}
}

function isAuthenticated(nextState, replace) {
	if (localStorage.token != undefined) {
		replace('/')
	}
}

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="/devices" />
			<Route path="auth/login" component={AuthLogin} onEnter={isAuthenticated} />
			<Route path="auth/register" component={AuthRegister} onEnter={isAuthenticated} />

			/* Device CRUD */
			<Route path="devices" component={DeviceList} onEnter={requireAuthentication} />
			<Route path="devices/create" component={Device} onEnter={requireAuthentication} />
			<Route path="devices/update/:id" component={DeviceUpdate} onEnter={requireAuthentication} />

			/* Attribute update */
			<Route path="attribute/update/:id/:udid" component={AttributeUpdate} onEnter={requireAuthentication} />

			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
)
