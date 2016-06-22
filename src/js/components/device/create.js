import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.device.create
	return { isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate (data) {
			dispatch(actions.create(data))
		}
	}
}

class Create extends React.Component {
	onSubmit (data) {
		this.props.onCreate(data)
	}

	componentWillReceiveProps (next) {
		if ( ! next.isCreating && next.item) {
			this.context.router.replace('/devices/' + next.item.id + '/edit')
		}
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Add device" loading={this.props.isCreating} />
					<Form submitLabel="Create device" onSubmit={this.onSubmit.bind(this)} loading={this.props.isCreating} />
				</div>
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
	router: React.PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
