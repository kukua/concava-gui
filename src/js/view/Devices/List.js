import React from 'react'
import { Link } from 'react-router'

import Title from '../Title';
import Table from './Table/Table';

export default class List extends React.Component {
	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="My devices" />
					<Table />
					<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
				</div>
			</div>
		)
	}
}
