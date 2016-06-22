import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/template'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.template.create
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
			this.context.router.replace('/templates/' + next.item.id + '/edit')
		}
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Add template" loading={this.props.isCreating} />
					<Form item={this.props.item} onSubmit={this.onSubmit.bind(this)} submitLabel="Create" loading={this.props.isCreating} />
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
