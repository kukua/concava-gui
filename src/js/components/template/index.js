import React from 'react'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import { instance as user } from '../../lib/user'
import { Table } from '../../lib/table'
import actions from '../../actions/template'

const mapStateToProps = (state) => {
	var { loading: isFetching, items } = state.template.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (userId) {
			return dispatch(actions.fetchByUserId(userId))
		},
	}
}

class Index extends React.Component {
	loadData () {
		this.props.onFetch(user.id)
	}
	componentWillMount () {
		this.loadData()
	}

	render () {
		var isLoading = (this.props.isFetching)

		return (
			<div>
				<Title title="Templates">
					<Link to="/templates/create" class="btn btn-sm btn-success icon-plus">Add template</Link>
				</Title>
				<Table loading={isLoading}
					columns={{
						name: {
							label: 'Name',
							key: 'name',
						},
						updatedAt: {
							label: 'Last updated',
							key: 'updated_at',
							isDate: true,
						},
						actions: {
							label: () => (
								<div className="text-right">Actions</div>
							),
							value: (val, { rowData: { id } }) => (
								<Link to={`/templates/${id}/edit`} class="btn btn-xs btn-success icon-pencil pull-right">Edit</Link>
							),
							cellProps: {
								className: 'less-padding',
							},
						},
					}}
					rows={this.props.items || []} />
			</div>
		)
	}
}

Index.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array,
}
Index.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
