import React from 'react'
import Title from '../Title'
import Form from './Form'

export default class Create extends React.Component {
	render() {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Add device" button='Cancel'/>
					<Form submit="Add" />
				</div>
			</div>
		)
	}
}
