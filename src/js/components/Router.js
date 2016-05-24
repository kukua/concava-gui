import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

import Layout from './layout/Master'
import NoMatch from './NoMatch'

import UserLogin from '../containers/users/Login'
import UserRegister from '../containers/users/Register'

import DeviceIndex from '../containers/devices/Index'
/*
import DeviceCreate from '../containers/devices/Create'
import DeviceUpdate from '../containers/devices/Update'
import DeviceDelete from '../containers/devices/Delete'

import AttributeIndex from '../containers/attributes/Index'
import AttributeCreate from '../containers/attributes/Create'
import AttributeUpdate from '../containers/attributes/Update'
import AttributeDelete from '../containers/attributes/Delete'
*/

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

			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
)
			/*
			<Route path="devices/create" component={DeviceCreate} onEnter={requireAuthentication} />
			<Route path="devices/update/:id" component={DeviceUpdate} onEnter={requireAuthentication} />
			<Route path="devices/delete/:id" component={DeviceDelete} onEnter={requireAuthentication} />

			// Attribute CRUD
			<Route path="attributes" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/create" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/update/:id" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/delete/:id" component={AttributeDelete} onEnter={requireAuthentication} />
			*/
