import React from 'react'
import Title from '../Title'
import Form from './Form'

export default class Update extends React.Component {
	render () {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Edit device" button="Cancel" />
					<Form submit="Edit" />
				</div>
			</div>
		)
	}
}
