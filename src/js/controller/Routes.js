import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

/* Default views */
import Layout  from '../view/Layout/Master'
import NoMatch from '../view/NoMatch'
import AuthLogin from '../view/Auth/Login'
import Device from '../view/Devices/Create'
import DeviceRead from '../view/Devices/Read'
import DeviceUpdate from '../view/Devices/Update'
import DeviceList from '../view/Devices/List'

function requireAuthentication(nextState, replace) {
	if (localStorage.token != 'true') {
		replace('/auth/login')
	}
}

function isAuthenticated(nextState, replace) {
	if (localStorage.token == 'true') {
		replace("/")
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
			<Route path="devices/read/:id" component={DeviceRead} onEnter={requireAuthentication} />
			<Route path="devices/update/:id" component={DeviceUpdate} onEnter={requireAuthentication} />

			{/*
			<Route path="attributes/create/:id" component={} onEnter={requireAuthentication} />
			<Route path="attributes/read/:id" component={} onEnter={requireAuthentication} />
			<Route path="attributes/update/:id" component={} onEnter={requireAuthentication} />
			<Route path="attributes/delete/:id" component={} onEnter={requireAuthentication} />
			*/}

			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
);
