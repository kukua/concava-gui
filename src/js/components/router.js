import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

import Layout from './layout/master'
import NoMatch from './noMatch'

import UserLogin from '../containers/user/login'
import UserRegister from '../containers/user/register'

import DeviceIndex from '../containers/device/index'
/*
import DeviceCreate from '../containers/device/create'
import DeviceUpdate from '../containers/device/update'
import DeviceDestroy from '../containers/device/destroy'

import AttributeIndex from '../containers/attribute/index'
import AttributeCreate from '../containers/attribute/create'
import AttributeUpdate from '../containers/attribute/update'
import AttributeDestroy from '../containers/attribute/destroy'
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
			<Route path="devices/delete/:id" component={DeviceDestroy} onEnter={requireAuthentication} />

			// Attribute CRUD
			<Route path="attributes" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/create" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/update/:id" component={AttributeUpdate} onEnter={requireAuthentication} />
			<Route path="attributes/delete/:id" component={AttributeDestroy} onEnter={requireAuthentication} />
			*/
