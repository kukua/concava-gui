import React from 'react'
import { Link } from 'react-router'

export default class TableBody extends React.Component {
	render() {
		return (
			<tbody>
				<tr>
					<td>Device 1</td>
					<td>
						<Link to="/devices/update/1">Edit</Link>
					</td>
				</tr>
			</tbody>
		)
	}
}
