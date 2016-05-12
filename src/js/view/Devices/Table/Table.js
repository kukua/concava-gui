import React from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'

export default class Table extends React.Component {
	render() {
		return (
			<table class="table table-striped">
				<TableHead />
				<TableBody />
			</table>
		)
	}
}
