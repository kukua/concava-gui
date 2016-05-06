import React from 'react'
import Title from '../Title';
import { Link } from 'react-router'
import Form from './Form'

export default class Update extends React.Component {
	render() {
		const { params } = this.props
		var data = {name: "Device #" + params.id, deviceId: "asdf1234b00b"}
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Update device" />
					<Form data={data} submit="Update" />
				</div>
			</div>
		)
	}
}
