import React from 'react'
import { Link } from 'react-router'

export default class TableBody extends React.Component {
	render() {
		const properties = this.props
		const { columns } = properties
		const { rows } = properties

		return (
			<tbody>
				{
					this.props.rows.map(function(row) {
						return (
							<tr key={row.id}>
								<td>{row.name}</td>
								<td class="pull-right">
									<Link to={columns.target + "/read/" + row.id + "/"}>Read</Link>&nbsp;|&nbsp;
									<Link to={columns.target + "/update/" + row.id + "/"}>Edit</Link>&nbsp;|&nbsp;
									<Link to={columns.target + "/delete/" + row.id + "/"}>Delete</Link>
								</td>
							</tr>
						)
	                })
				}
			</tbody>
		)
	}
}
