import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import config from '../../config'
import notify from '../../lib/notify'
import actions from '../../actions/template'

const mapStateToProps = (state) => {
	var { loading: isCreating, item } = state.template.create
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
		this.props.onCreate(data).then((item) => {
			notify.created('template')
			this.context.router.replace('/templates/' + item.id + '/edit')
		})
	}

	render () {
		var defaultLabels = [
			{ name: 'Default device labels', value: config.defaultDeviceLabels },
		]

		return (
			<div>
				<Title title="Add template" loading={this.props.isCreating} />
				<Form submitLabel="Create template" defaultLabels={defaultLabels}
					onSubmit={this.onSubmit.bind(this)} loading={this.props.isCreating} />
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
