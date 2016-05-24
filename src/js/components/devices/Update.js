import React from 'react'
import Title from '../Title'
import Attributes from '../../containers/Attributes'

export default class Update extends React.Component {

	render () {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Device attributes" button='Cancel'/>
					<Attributes deviceId={ this.props.params.id } />
				</div>
			</div>
		)
	}
}
