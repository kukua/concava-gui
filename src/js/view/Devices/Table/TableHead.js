import React from 'react'

export default class TableHead extends React.Component {
	render() {
		return (
			<thead>
				<tr>
					<th>Name</th>
					<th width="140px">Action</th>
				</tr>
			</thead>
		)
	}
}
