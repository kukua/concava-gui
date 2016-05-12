import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

/* Default views */
import Layout  from './layout/Master'
import NoMatch from './NoMatch'
import AuthLogin from './auth/Login'

import Device from './devices/Create'
import DeviceUpdate from './devices/Update'
import DeviceList from '../containers/DeviceList'

function requireAuthentication(nextState, replace) {
	if (localStorage.token != 'true') {
		replace('/auth/login')
	}
}

function isAuthenticated(nextState, replace) {
	if (localStorage.token == 'true') {
		replace('/')
	}
}

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="/devices" />
			<Route path="auth/login" component={AuthLogin} onEnter={isAuthenticated} />

			/* Device CRUD */
			<Route path="devices" component={DeviceList} onEnter={requireAuthentication} />
			<Route path="devices/create" component={Device} onEnter={requireAuthentication} />
			<Route path="devices/update/:id" component={DeviceUpdate} onEnter={requireAuthentication} />

			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
)
