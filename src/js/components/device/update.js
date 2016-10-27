import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import { Table } from '../../lib/table'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	var { loading: isUpdating } = state.device.update
	var { loading: isFetching, item } = state.device.fetch
	var { loading: isDestroying } = state.device.destroy
	return { isFetching, isUpdating, isDestroying, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			return dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			return dispatch(actions.update(data))
		},
		onDestroy (id) {
			return dispatch(actions.destroy(id))
		},
	}
}

class Update extends React.Component {
	componentWillMount () {
		this.props.onFetch(this.props.params.id)
	}

	onSubmit (data) {
		this.props.onUpdate(data).then(() => {
			notify.updated('device')
			this.context.router.replace('/devices')
		})
	}
	onDestroy () {
		if ( ! confirm('Are you sure? This cannot be undone.')) return

		this.props.onDestroy(this.props.item.id).then(() => {
			notify.destroyed('device')
			this.context.router.replace('/devices')
		})
	}

	render () {
		var isLoading = (this.props.isFetching || this.props.isUpdating || this.props.isDestroying)
		var item = this.props.item
		var columns = {}

		if (item) {
			_.each(item.template.attributes, (attr) => {
				columns[attr.name] = {
					label: attr.name,
					key: attr.name,
				}
			})
		}

		return (
			<div>
				<Title title="Edit device" loading={isLoading}>
					<a href="javascript:;" class="btn btn-sm btn-danger icon-trash" onClick={() => this.onDestroy()}>Destroy</a>
				</Title>
				<Form item={this.props.item} submitLabel="Update device" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
				{item && (
					<div>
						<Title title="Last measurement" backButton={false} loading={isLoading} />
						<Table loading={isLoading}
							columns={columns}
							rows={item.measurement ? [item.measurement] : []} />
					</div>
				)}
			</div>
		)
	}
}

Update.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	params: React.PropTypes.shape({
		id: React.PropTypes.string.isRequired,
	}).isRequired,
	isFetching: React.PropTypes.bool,
	onUpdate: React.PropTypes.func.isRequired,
	isUpdating: React.PropTypes.bool,
	onDestroy: React.PropTypes.func.isRequired,
	isDestroying: React.PropTypes.bool,
	item: React.PropTypes.object,
}
Update.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
