import React from 'react'
import { Link, hashHistory } from 'react-router'

export default class Title extends React.Component {

	handleBackButton() {
		return hashHistory.goBack
	}

	getBackButton(val) {
		if (val != undefined) {
			return (
				<a href="javascript:;" class='btn-link-title' onClick={this.handleBackButton()}>{val}</a>
			)
		}
	}

	getSubTitle(val) {
		if (val != undefined) {
			return (
				<small> - {val}</small>
			)
		}
	}

	render() {
		return (
			<div>
				<div class="row">
					<div class="col-sm-2">
						{this.getBackButton(this.props.link)}
					</div>
					<div class="col-sm-8">
						<h3>
							{this.props.title}
							{this.getSubTitle(this.props.subtitle)}
						</h3>
					</div>
				</div>
				<hr />
			</div>
		)
	}
}
