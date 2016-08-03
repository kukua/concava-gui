import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/template'
import AttributeIndex from '../attribute/index'

const mapStateToProps = (state) => {
	let { loading: isUpdating } = state.template.update
	let { loading: isFetching, item } = state.template.fetch
	let { loading: isDuplicating } = state.template.duplicate
	return { isFetching, isUpdating, isDuplicating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			return dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			return dispatch(actions.update(data))
		},
		onDuplicate (id) {
			return dispatch(actions.duplicate(id))
		},
	}
}

class Update extends React.Component {
	componentWillMount () {
		this.props.onFetch(this.props.params.id)
	}

	onSubmit (data) {
		this.props.onUpdate(data).then(() => {
			notify.updated('template')
		})
	}

	duplicate () {
		this.props.onDuplicate(this.props.item.id).then((item) => {
			notify.action('template', 'duplicated')
			this.context.router.replace('/templates/' + item.id + '/edit')
		})
	}

	render () {
		let isLoading = (this.props.isFetching || this.props.isUpdating || this.props.isDuplicating)

		return (
			<div>
				<Title title="Edit template" loading={isLoading}>
					<a href="javascript:;" class="btn btn-sm btn-warning" onClick={() => this.duplicate()}>Duplicate</a>
				</Title>
				<Form item={this.props.item} submitLabel="Update template" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
				{this.props.item &&
					<AttributeIndex templateId={this.props.item.id} />
				}
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
	onDuplicate: React.PropTypes.func.isRequired,
	isDuplicating: React.PropTypes.bool,
	item: React.PropTypes.object,
}
Update.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
