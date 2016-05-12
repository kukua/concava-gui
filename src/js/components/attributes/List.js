import React from 'react'
import Reorder from 'react-reorder'

var ListItem = React.createClass({
	render: function () {
		return React.createElement('div', {
			className: 'inner',
			style: {
				color: this.props.item.color
			}
		}, this.props.sharedProps ? this.props.sharedProps.prefix : undefined,
			<ul class="list-inline list-hover">
				<li>{ this.props.item.id }</li>
				<li>{ this.props.item.name }</li>
				<li>{ this.props.item.convert }</li>
				<li>{ this.props.item.calibrate }</li>
				<li>{ this.props.item.validate }</li>
			</ul>
		)
	}
})

export default class List extends React.Component {
	constructor() {
		super()
		this.state = {
			selected: ''
		}
	}
	componentWillMount () {
		this.props.onFetch()
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
		if (this.props != undefined) {
			if ( ! this.props.isFetching) {
				return (
					<Reorder
						itemKey='name'
						lock='horizontal'
						holdTime='0'
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
			}
		}
		return (
			<div>
				Loading...
			</div>
		)
	}
}

List.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array
}
