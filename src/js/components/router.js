import React from 'react'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { instance as user } from '../lib/user'

import Layout from './layout/master'
import NoMatch from './noMatch'

import UserLogin from '../components/user/login'
import UserRegister from '../components/user/register'

import DeviceIndex from '../components/device/index'
import DeviceCreate from '../components/device/create'
import DeviceUpdate from '../components/device/update'

import TemplateIndex from '../components/template/index'
import TemplateCreate from '../components/template/create'
import TemplateUpdate from '../components/template/update'

import AttributeCreate from '../components/attribute/create'
import AttributeUpdate from '../components/attribute/update'

function requireAuthentication (nextState, replace) {
	if ( ! user.isLoggedIn) replace('/users/login')
}

function isAuthenticated (nextState, replace) {
	if (user.isLoggedIn) replace('/')
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

			// Template CRUD
			<Route path="templates" component={TemplateIndex} onEnter={requireAuthentication} />
			<Route path="templates/create" component={TemplateCreate} onEnter={requireAuthentication} />
			<Route path="templates/:id/edit" component={TemplateUpdate} onEnter={requireAuthentication} />

			// Attribute CRUD
			<Route path="attributes/create" component={AttributeCreate} onEnter={requireAuthentication} />
			<Route path="attributes/:id/edit" component={AttributeUpdate} onEnter={requireAuthentication} />

			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
)
