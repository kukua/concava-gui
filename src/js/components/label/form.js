import React from 'react'
import _ from 'underscore'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			labels: _.map(this.props.labels, _.clone),
		}
	}

	componentWillReceiveProps (next) {
		this.setState({
			labels: _.map(next.labels, _.clone),
		})
	}

	onChange () {
		this.props.onChange(this.state.labels)
	}
	onNameChange (label, name) {
		label.name = name
		this.onChange()
	}
	onValueChange (label, value) {
		label.value = value
		this.onChange()
	}
	onRemove (label) {
		let labels = this.state.labels
		let index  = labels.indexOf(label)
		labels.splice(index, 1)
		this.setState({ labels })
		this.onChange()
	}

	render () {
		return (
			<div>
				{_.map(this.state.labels, (label, i) => {
					let name  = (label.name  || '')
					let key   = (label.key   || '')
					let value = (label.value || '')

					if (typeof value !== 'string') {
						value = JSON.stringify(value)
					}

					return (
						<div key={key + i} class="form-group">
							<div class="col-sm-3">
								<input type="text" class="form-control text-right" value={name} placeholder="Name" onChange={(ev) => this.onNameChange(label, ev.target.value)} disabled={this.props.loading} />
							</div>
							<div class="col-sm-8">
								<input type="text" class="form-control" value={value} placeholder="Value" onChange={(ev) => this.onValueChange(label, ev.target.value)} disabled={this.props.loading} />
							</div>
							<div class="col-sm-1 text-right">
								<button class="btn btn-danger icon-cancel icon-only" title="Remove" onClick={(ev) => {
									ev.preventDefault()
									this.onRemove(label)
								}} />
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}

Form.propTypes = {
	labels: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		key: React.PropTypes.string,
		value: React.PropTypes.isRequired,
		created_at: React.PropTypes.string,
	})),
	onChange: React.PropTypes.func.isRequired,
	loading: React.PropTypes.bool,
}
