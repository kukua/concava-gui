import React from 'react'
import Title from '../Title'
import { Link } from 'react-router'

import Table from '../Table/Table'

export default class Read extends React.Component {
	render () {
		const name = "My device #" + this.props.params.id;

		const columns = {
			title: 'Attributes',
			actions: 'Actions',
			target: 'attributes'
		}

		const rows = [{
			id: '1',
			name: 'Temperature'
		}, {
			id: '2',
			name: 'Humidity'
		}, {
			id: '3',
			name: 'Rainfall'
		}]


		return (
			<div>
				<div class="row">
					<div class="col-sm-8 col-sm-offset-2">
						<Title title={name} subtitle="b00bb00bb00bb00b" link="Back"/>
						<Table columns={columns} rows={rows}/>
						<button class="btn btn-primary pull-right">Add attribute</button>
					</div>
				</div>
			</div>
		)
	}
}
