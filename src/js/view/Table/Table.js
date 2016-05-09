import React from 'react'

import TableHead from './TableHead'
import TableBody from './TableBody'

export default class Table extends React.Component {
	render() {
		const properties = this.props
		const { columns } = properties
		const { rows } = properties

		return (
			<table class="table table-striped">
				<TableHead columns={columns} />
				<TableBody columns={columns} rows={rows} />
			</table>
		)
	}
}
