import React from 'react'
import LabelForm from '../label/form'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
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
	onAddLabel (ev) {
		ev.preventDefault()
		let labels = this.getItem().labels
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
	item: React.PropTypes.shape({
		id: React.PropTypes.number,
		name: React.PropTypes.string,
		labels: React.PropTypes.array,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}
