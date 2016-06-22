import React from 'react'
import _ from 'underscore'
import { connect } from 'react-redux'
import { instance as user } from '../../lib/user'
import actions from '../../actions/template'

const mapStateToProps = (state) => {
	let { loading: isFetching, items: templates } = state.template.fetchAll
	return { isFetching, templates }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (userId) {
			dispatch(actions.fetchByUserId(userId))
		},
	}
}

class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = { item: this.getItem() }
	}
	getItem () {
		return (this.state && this.state.item || this.props.item || {})
	}

	componentWillMount () {
		this.props.onFetch(user.id)
	}

	componentWillReceiveProps (next) {
		this.setState({ item: next.item })
	}

	onChange (ev) {
		let item = this.getItem()
		item[ev.target.name] = ev.target.value
		this.setState({ item })
	}
	onTemplateChange (ev) {
		let item = this.getItem()
		item[ev.target.name] = parseInt(ev.target.value)
		this.setState({ item })
	}
	onSubmit (ev) {
		ev.preventDefault()

		this.props.onSubmit(this.state.item)
	}

	render () {
		let item = this.getItem()

		return (
			<div>
				<form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label" for="name">Name</label>
						<div class="col-sm-6">
							<input type="text" name="name" class="form-control" value={item.name || ''} onChange={this.onChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label" for="udid">Device ID</label>
						<div class="col-sm-6">
							<input type="text" name="udid" class="form-control" value={item.udid || ''} onChange={this.onChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label" for="udid">Template</label>
						<div class="col-sm-6">
							<select name="template_id" class="form-control" value={item.template_id} onChange={this.onTemplateChange.bind(this)} disabled={this.props.loading || this.props.isFetching}>
								<option>-- Pick template --</option>
								{_.map(this.props.templates, (template) => (
									<option key={template.id} value={template.id}>{template.name}</option>
								))}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label"></label>
						<div class="col-sm-6">
							<button type="submit" class="btn btn-primary pull-right" disabled={this.props.loading}>{this.props.submitLabel || 'Save'}</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

Form.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	templates: React.PropTypes.array,
	item: React.PropTypes.shape({
		id: React.PropTypes.number.isRequired,
		template_id: React.PropTypes.number.isRequired,
		udid: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form)
