import React from 'react'
import Reorder from 'react-reorder'
import { Link } from 'react-router'

var ListItem = React.createClass({
	render: function () {
		return React.createElement('div', {
			className: 'inner',
		}, this.props.sharedProps ? this.props.sharedProps.prefix : undefined,
			<ul class="list-inline list-hover">
				<li>{ this.props.item.id }</li>
				<li>{ this.props.item.name }</li>
				<li>{ this.props.item.convert }</li>
				<li>{ this.props.item.calibrate }</li>
				<li>{ this.props.item.validate }</li>
				<li>{ this.props.item.validate }</li>
				<li class="pull-right">
					<Link to={{ pathname: '/attribute/update/' + this.props.item.id }}>Edit</Link>
				</li>
			</ul>
		)
	},
	propTypes: {
		item: React.PropTypes.object.isRequired,
		sharedProps: React.PropTypes.array,
		sharedPropsPrefix: React.PropTypes.string
	}
})

export default class List extends React.Component {
	constructor () {
		super()
		this.state = {
			selected: ''
		}
	}

	componentWillMount () {
		this.props.onFetch()
	}

	handleSubmit (e) {
		e.preventDefault()

		var data = {
			order: null,
			id: 4,
			name: e.target.name.value,
			convert: e.target.convert.value,
			calibrate: e.target.calibrate.value,
			validate: e.target.validate.value
		}
		this.props.onCreate(data)
	}

	callback (event, item, index, newIndex, list) {
		console.log(list)
	}

	itemClicked (event, item) {
		this.setState({
			clickedItem: item === this.state.clickedItem ? undefined : item
		})
	}

	itemClicked2 (event, item) {
		this.setState({clickedItem2: item})
	}

	disableToggled () {
		this.setState({disableReorder: !this.state.disableReorder})
	}

	prefixChanged (event) {
		var target = event.currentTarget
		this.setState({prefix: target.value})
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-4">
					<form class="form form-horizontal" method="post" onSubmit={this.handleSubmit.bind(this)}>
						<div class="form-group">
							<label class="control-label col-sm-2">Name</label>
							<div class="col-sm-10">
								<input type="text" name="name" class="form-control input-sm" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-sm-2">Convert</label>
							<div class="col-sm-10">
								<select class="form-control input-sm" name="convert">
									<option>int8</option>
									<option>int16le</option>
									<option>int32le</option>
									<option>uint16le</option>
									<option>uint32le</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Calibrate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="calibrate" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Validate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="validate" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2"></label>
							<div class="col-sm-10">
								<button type="submit" class="btn btn-success pull-right">Add attribute</button>
							</div>
						</div>
					</form>
				</div>
				<div class="col-sm-8">
					<div class="panel panel-default">
						<div class="panel-heading">Attributes</div>
						<div class="panel-body">
							{( () => {
								if ( this.props != undefined && this.props.isFetching === false) {
									return (
										<Reorder
											itemKey='name'
											lock='horizontal'
											holdTime='150'
											list={this.props.items}
											template={ListItem}
											callback={this.callback.bind(this)}
											listClass='my-list'
											itemClass='list-item'
											itemClicked={this.itemClicked.bind(this)}
											selected={this.state.selected}
											selectedKey='uuid'
											disableReorder={false}/>
									)
								} else {
									return (
										<div>Loading...</div>
									)
								}
							})()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

List.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array
}
