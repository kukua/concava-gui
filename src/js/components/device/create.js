import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.device.create
	return { isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate (data) {
			return dispatch(actions.create(data))
		}
	}
}

class Create extends React.Component {
	onSubmit (data) {
		this.props.onCreate(data).then(() => {
			notify.created('device')
			this.context.router.replace('/devices')
		})
	}

	render () {
		return (
			<div>
				<Title title="Add device" loading={this.props.isCreating} />
				<Form submitLabel="Create device" onSubmit={this.onSubmit.bind(this)} loading={this.props.isCreating} />
			</div>
		)
	}
}

Create.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	isCreating: React.PropTypes.bool,
	item: React.PropTypes.object,
}
Create.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
