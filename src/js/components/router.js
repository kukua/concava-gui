import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

import Layout from './layout/master'
import NoMatch from './noMatch'

import UserLogin from '../components/user/login'
import UserRegister from '../components/user/register'

import DeviceIndex from '../components/device/index'
import DeviceCreate from '../components/device/create'
import DeviceUpdate from '../components/device/update'

import AttributeCreate from '../components/attribute/create'
import AttributeUpdate from '../components/attribute/update'

function requireAuthentication (nextState, replace) {
	if ( ! localStorage.token) replace('/users/login')
}

function isAuthenticated (nextState, replace) {
	if (localStorage.token) replace('/')
}

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="/devices" />
			<Route path="users/login" component={UserLogin} onEnter={isAuthenticated} />
			<Route path="users/register" component={UserRegister} onEnter={isAuthenticated} />

			// Device CRUD
			<Route path="devices" component={DeviceIndex} onEnter={requireAuthentication} />
			<Route path="devices/create" component={DeviceCreate} onEnter={requireAuthentication} />
			<Route path="devices/:id/edit" component={DeviceUpdate} onEnter={requireAuthentication} />

			// Attribute CRUD
			<Route path="attributes/create" component={AttributeCreate} onEnter={requireAuthentication} />
			<Route path="attributes/:id/edit" component={AttributeUpdate} onEnter={requireAuthentication} />

			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
)
