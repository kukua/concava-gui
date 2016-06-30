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
		this.state = {}
	}

	componentWillMount () {
		this.props.onFetch(user.id)
	}
	componentWillReceiveProps () {
		this.setState({})
	}

	getItem () {
		let item = (this.props.item || {})
		return Object.assign({}, item, this.state)
	}
	onChange (ev) {
		let key = ev.target.name
		let val = ev.target.value
		this.setState({ [key]: val })
	}
	onUDIDChange (ev) {
		let key = ev.target.name
		let val = ev.target.value.toLowerCase().replace(/[^a-f0-9]/g, '').substr(0, 16)
		this.setState({ [key]: val })
	}
	onTemplateChange (ev) {
		let key = ev.target.name
		let val = parseInt(ev.target.value)
		this.setState({ [key]: val })
	}
	onSubmit (ev) {
		ev.preventDefault()
		this.props.onSubmit(this.getItem())
	}

	render () {
		let item = this.getItem()

		return (
			<div>
				<form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
					<div class="form-group">
						<label class="col-sm-3 control-label" for="name">Name</label>
						<div class="col-sm-9">
							<input type="text" name="name" class="form-control" value={item.name || ''} onChange={this.onChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label" for="udid">Device ID</label>
						<div class="col-sm-9">
							<input type="text" name="udid" class="form-control" value={item.udid || ''} placeholder="example: abcdef0123456789 (16 lowercase hexadecimal characters)" onChange={this.onUDIDChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label" for="udid">Template</label>
						<div class="col-sm-9">
							<select name="template_id" class="form-control" value={item.template_id || ''} onChange={this.onTemplateChange.bind(this)} disabled={this.props.loading || this.props.isFetching}>
								<option>-- Pick a template --</option>
								{_.map(this.props.templates, (template) => (
									<option key={template.id} value={template.id}>{template.name}</option>
								))}
							</select>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
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
		id: React.PropTypes.number,
		template_id: React.PropTypes.number.isRequired,
		udid: React.PropTypes.string,
		name: React.PropTypes.string,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form)
