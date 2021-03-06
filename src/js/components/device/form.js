import React from 'react'
import _ from 'underscore'
import { connect } from 'react-redux'
import { instance as user } from '../../lib/user'
import actions from '../../actions/template'
import LabelForm from '../label/form'

const mapStateToProps = (state) => {
	var { loading: isFetching, items: templates } = state.template.fetchAll
	return { isFetching, templates }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (userId) {
			return dispatch(actions.fetchByUserId(userId))
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
		var item = (this.props.item || {})
		var labels = (this.props.defaultLabels || [])
		return Object.assign({ labels }, item, this.state)
	}
	onChange (ev) {
		var key = ev.target.name
		var val = ev.target.value
		this.setState({ [key]: val })
	}
	onUDIDChange (ev) {
		var key = ev.target.name
		var val = ev.target.value.toLowerCase().replace(/[^a-f0-9]/g, '').substr(0, 16)
		this.setState({ [key]: val })
	}
	onTemplateChange (ev) {
		var key = ev.target.name
		var val = parseInt(ev.target.value)
		this.setState({ [key]: val })

		if (this.props.onTemplateChange) {
			this.props.onTemplateChange(val)
		}
	}
	onAddLabel (ev) {
		ev.preventDefault()
		var labels = this.getItem().labels
		labels.push({ name: '', key: '', value: '' })
		this.setState({ labels })
	}
	onLabelsChange (labels) {
		this.setState({ labels })
	}
	onSubmit (ev) {
		ev.preventDefault()
		this.props.onSubmit(this.getItem())
	}

	render () {
		var item = this.getItem()

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
					<LabelForm labels={item.labels || []} onChange={this.onLabelsChange.bind(this)} loading={this.props.loading} />
					<div class="form-group">
						<div class="col-sm-12">
							<div class="btn-group pull-right">
								<button class="btn btn-default" onClick={this.onAddLabel.bind(this)} disabled={this.props.loading}>{'Add label'}</button>
								<button type="submit" class="btn btn-success" disabled={this.props.loading}>{this.props.submitLabel || 'Save'}</button>
							</div>
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
		labels: React.PropTypes.array,
	}),
	defaultLabels: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		key: React.PropTypes.string,
		value: React.PropTypes.isRequired,
		created_at: React.PropTypes.string,
	})),
	onSubmit: React.PropTypes.func.isRequired,
	onTemplateChange: React.PropTypes.func,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form)
