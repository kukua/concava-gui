import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.attribute.create
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
			this.context.router.replace('/attributes/' + next.item.id + '/edit')
		}
	}

	render () {
		let query = this.props.location.query
		let item = {
			template_id: parseInt(query.template_id),
			order: parseInt(query.order),
		}

		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Add attribute" loading={this.props.isCreating} />
					<Form item={item} submitLabel="Create attribute" onSubmit={this.onSubmit.bind(this)} loading={this.props.isCreating} />
				</div>
			</div>
		)
	}
}

Create.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	isCreating: React.PropTypes.bool,
	item: React.PropTypes.object,
	location: React.PropTypes.shape({
		query: React.PropTypes.object.isRequired,
	}).isRequired,
}
Create.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
