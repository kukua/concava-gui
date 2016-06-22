import React from 'react'

export default class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = { item: (this.props.item || {}) }
	}

	componentWillReceiveProps (next) {
		this.setState({ item: next.item })
	}

	onChange (ev) {
		let item = this.state.item
		item[ev.target.name] = ev.target.value
		this.setState({ item })
	}
	onSubmit (ev) {
		ev.preventDefault()

		this.props.onSubmit(this.state.item)
	}

	render () {
		let item = (this.state.item || {})

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
	item: React.PropTypes.shape({
		id: React.PropTypes.number,
		name: React.PropTypes.string.isRequired,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}
