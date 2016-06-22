import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/template'
import AttributeIndex from '../attribute/index'

const mapStateToProps = (state) => {
	let { loading: isUpdating, item } = state.template.update
	let { loading: isFetching, item: fetchedItem } = state.template.fetch
	if ( ! item) item = fetchedItem
	return { isFetching, isUpdating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			dispatch(actions.update(data))
		},
	}
}

class Update extends React.Component {
	componentWillMount () {
		this.props.onFetch(this.props.params.id)
	}

	onSubmit (data) {
		this.props.onUpdate(data)
	}

	render () {
		let isLoading = (this.props.isFetching || this.props.isUpdating)

		return (
			<div>
				<div class="row">
					<div class="col-sm-offset-2 col-sm-8">
						<Title title="Edit template" loading={isLoading} />
						<Form item={this.props.item} onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
					</div>
				</div>
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
	item: React.PropTypes.object,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
