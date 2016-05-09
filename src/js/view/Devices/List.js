import React from 'react'
import Title from '../Title';
import Table from '../Table/Table';
import { Link } from 'react-router'

export default class List extends React.Component {
	render () {
		const columns = {
			title: 'Name',
			actions: 'Actions',
			target: 'devices'
		}

		const rows = [{
			id: '1',
			name: 'device'
		}, {
			id: '2',
			name: 'device 2'
		}]

		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="My devices" />
					<Table columns={columns} rows={rows} />
					<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
				</div>
			</div>
		)
	}
}
