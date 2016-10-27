import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	var { loading: isCreating, item } = state.attribute.create
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
			notify.created('attribute')
			this.context.router.replace('/templates/' + item.template_id + '/edit')
		})
	}

	render () {
		var query = this.props.location.query
		var item = {
			template_id: parseInt(query.template_id),
			order: parseInt(query.order),
		}

		return (
			<div>
				<Title title="Add attribute" loading={this.props.isCreating} />
				<Form item={item} submitLabel="Create attribute" onSubmit={this.onSubmit.bind(this)} loading={this.props.isCreating} />
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
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
