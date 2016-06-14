import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import Reorder from 'react-reorder'
import { Link } from 'react-router'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.attributes.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (deviceId) {
			dispatch(actions.fetchByDeviceId(deviceId))
		}
	}
}

export class Item extends React.Component {
	render () {
		var { item, sharedProps } = this.props.item

		console.log(sharedProps)

		return (
			<div class="inner" prefix={sharedProps ? sharedProps.prefix : undefined}>
				<ul class="list-inline list-hover">
					{
						<li key={ item.id } style={{ display: 'block' }}>
							<table class="table" style={{ marginBottom: 0 }}>
								<tbody>
									<tr>
										<td style={{ width: 15 + '%' }}>#{ item.order } { item.name }</td>
										<td style={{ width: 15 + '%' }}>{ ! _.isEmpty(item.converters) && item.converters[0].type }</td>
										<td style={{ width: 30 + '%' }}>{ ! _.isEmpty(item.calibrators) && item.calibrators[0].fn }</td>
										<td style={{ width: 30 + '%' }}>{ ! _.isEmpty(item.validators) && _.map(item.validators, (validator) => { return `${validator.type}=${validator.value}` }).join(', ') }</td>
										<td style={{ width: 10 + '%' }}><Link to={{ pathname: '/attributes/update/' + item.id + '/' + sharedProps.udid }}>Edit</Link></td>
									</tr>
								</tbody>
							</table>
						</li>
					}
				</ul>
			</div>
		)
	}
}

Item.propTypes = {
	item: React.PropTypes.object.isRequired,
	sharedProps: React.PropTypes.object,
	sharedPropsPrefix: React.PropTypes.string
}

class Index extends React.Component {
	constructor () {
		super()

		this.state = {
			selected: ''
		}
	}

	componentWillMount () {
		this.props.onFetch(this.props.deviceId)
	}

	onSubmit (ev) {
		ev.preventDefault()

		var data = {
			order: ev.target.order.value,
			template_id: ev.target.template_id.value,
			name: ev.target.name.value,
			converter: ev.target.converter.value,
			calibrator: ev.target.calibrator.value,
			validators: ev.target.validator.value
		}
		this.props.onCreate(data, this.props.device.udid)
	}

	callback (ev, item, index, newIndex, list) {
		console.log(list)
	}

	itemClicked (ev, item) {
		this.setState({
			clickedItem: item === this.state.clickedItem ? undefined : item
		})
	}

	itemClicked2 (ev, item) {
		this.setState({clickedItem2: item})
	}

	disableToggled () {
		this.setState({disableReorder: !this.state.disableReorder})
	}

	prefixChanged (ev) {
		var target = ev.currentTarget
		this.setState({prefix: target.value})
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-4">
					<form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
						<div class="form-group">
							<label class="control-label col-sm-2">Name</label>
							<div class="col-sm-10">
								<input type="text" name="name" class="form-control input-sm" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-sm-2">Convert</label>
							<div class="col-sm-10">
								<select class="form-control input-sm" name="converter">
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
								<input type="text" class="form-control input-sm" name="calibrator" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Validate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="validator" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2"></label>
							<div class="col-sm-10">
								{
									this.props.device &&
									<input type="hidden" name="template_id" value={ this.props.device.template_id } />
								}
								{
									this.props.device &&
									<input type="hidden" name="order" value={ this.props.device.template.attributes.length } />
								}
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
											itemKey="name"
											lock="horizontal"
											holdTime="200"
											list={this.props.device.template.attributes}
											template={Item}
											callback={this.callback.bind(this)}
											listClass="my-list"
											itemClass="list-item"
											itemClicked={this.itemClicked.bind(this)}
											selected={this.state.selected}
											selectedKey="uuid"
											disableReorder={false}
											sharedProps={ {udid: this.props.device.udid} }
											/>
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

Index.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	device: React.PropTypes.object,
	deviceId: React.PropTypes.number
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
