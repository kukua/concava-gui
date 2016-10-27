import React from 'react'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import { Table } from '../../lib/table'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	var { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			return dispatch(actions.fetchAll())
		},
	}
}

class Index extends React.Component {
	loadData () {
		this.props.onFetch()
	}
	componentWillMount () {
		this.loadData()
	}

	render () {
		var isLoading = (this.props.isFetching)

		return (
			<div>
				<Title title="Devices">
					<Link to="/devices/create" class="btn btn-sm btn-success icon-plus">Add device</Link>
				</Title>
				<Table loading={isLoading}
					columns={{
						name: {
							label: 'Name',
							key: 'name',
						},
						udid: {
							label: 'Device ID',
							key: 'udid',
							cellProps: {
								style: { minWidth: '160px' },
							},
						},
						template: {
							label: 'Template',
							key: 'template.name',
						},
						updatedAt: {
							label: 'Last updated',
							key: 'updated_at',
							isDate: true,
						},
					}}
					rows={this.props.items || []}
					onRowClick={(item) => this.context.router.replace('/devices/' + item.id + '/edit')} />
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
