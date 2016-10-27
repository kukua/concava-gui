import React from 'react'
import _ from 'underscore'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/device'
import templateActions from '../../actions/template'

const mapStateToProps = (state) => {
	var { loading: isFetching, item: template } = state.template.fetch
	var { loading: isCreating, item } = state.device.create
	return { isFetching, isCreating, template, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchTemplate (id) {
			return dispatch(templateActions.fetch(id))
		},
		onCreate (data) {
			return dispatch(actions.create(data))
		},
	}
}

class Create extends React.Component {
	onTemplateChange (id) {
		if ( ! id) return
		this.props.onFetchTemplate(id)
	}
	onSubmit (data) {
		this.props.onCreate(data).then(() => {
			notify.created('device')
			this.context.router.replace('/devices')
		})
	}

	render () {
		var isLoading = (this.props.isFetching || this.props.isCreating)
		var defaultLabels = []
		var template = this.props.template

		if (template && template.labels) {
			let label = _.find(template.labels, (label) => label.key === 'default_device_labels')
			if (label && label.value) {
				defaultLabels = _.map(label.value.split(','), (name) => ({ name, value: '' }))
			}
		}

		return (
			<div>
				<Title title="Add device" loading={isLoading} />
				<Form submitLabel="Create device" defaultLabels={defaultLabels}
					onTemplateChange={this.onTemplateChange.bind(this)}
					onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
			</div>
		)
	}
}

Create.propTypes = {
	onFetchTemplate: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	onCreate: React.PropTypes.func.isRequired,
	isCreating: React.PropTypes.bool,
	template: React.PropTypes.object,
	item: React.PropTypes.object,
}
Create.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
