import React from 'react'

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
	item: React.PropTypes.shape({
		id: React.PropTypes.number,
		name: React.PropTypes.string,
	}),
	onSubmit: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
}
