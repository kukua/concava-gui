import React from 'react'
import _ from 'underscore'
import config from '../../config.js'
import concava from '../../lib/concava'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
	}

	componentWillReceiveProps () {
		this.setState({})
	}

	getItem () {
		var item = (this.props.item || {})
		return Object.assign({}, item, concava(item), this.state)
	}
	onChange (ev) {
		var key = ev.target.name
		var val = ev.target.value
		this.setState({ [key]: val })
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
						<label class="col-sm-3 control-label" for="name">Converter</label>
						<div class="col-sm-9">
							<select name="converter" class="form-control" value={item.converter || ''} onChange={this.onChange.bind(this)} disabled={this.props.loading}>
								<option>-- Pick a converter --</option>
								{_.map(config.converters, (converter) => (
									<option key={converter} value={converter}>{converter}</option>
								))}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label" for="name">Calibrator</label>
						<div class="col-sm-9">
							<textarea rows={3} name="calibrator" class="form-control" value={item.calibrator || ''} placeholder="example: return val / 10" onChange={this.onChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label" for="name">Validator(s)</label>
						<div class="col-sm-9">
							<input type="text" name="validators" class="form-control" value={item.validators || ''} placeholder="min=-100 max=100" onChange={this.onChange.bind(this)} disabled={this.props.loading} />
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
							<button type="submit" class="btn btn-success pull-right" disabled={this.props.loading}>{this.props.submitLabel || 'Save'}</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

Form.propTypes = {
	item: React.PropTypes.shape({
		id: React.PropTypes.number,
		template_id: React.PropTypes.number.isRequired,
		name: React.PropTypes.string,
		order: React.PropTypes.number.isRequired,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}
