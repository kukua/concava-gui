import React from 'react'
import { hashHistory } from 'react-router'

export default class Title extends React.Component {
	getBackButton (val) {
		if (val != undefined) {
			return (
				<a href="javascript:;" class='btn-link-title' onClick={hashHistory.goBack}>{val}</a>
			)
		}
	}

	getSubTitle (val) {
		if (val != undefined) {
			return (
				<small> - {val}</small>
			)
		}
	}

	render () {
		return (
			<div>
				<div class="row">
					<div class="col-sm-2">
						{this.getBackButton(this.props.button)}
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

Title.propTypes = {
	button: React.PropTypes.string,
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string

}
