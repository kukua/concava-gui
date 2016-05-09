import React from 'react'

export default class TableHead extends React.Component {
	render() {
		const { columns } = this.props

		return (
			<thead>
				<tr>
					<th>{columns.title}</th>
					<th width="140px">{columns.actions}</th>
				</tr>
			</thead>
		)
	}
}
