import React from 'react'
import { hashHistory } from 'react-router'

export default class Title extends React.Component {
	render () {
		let backButtonLabel = (this.props.backButtonLabel || 'Go back')

		return (
			<div>
				<h3>
					{this.props.title}
					{this.props.subTitle && (<small> - {this.props.subTitle}</small>)}
					<div class="btn-group pull-right">
						{backButtonLabel && ! this.props.loading &&
							<a href="javascript:;" class="btn btn-sm btn-default" onClick={hashHistory.goBack}>
								&laquo; {backButtonLabel}
							</a>
						}
						{this.props.children}
					</div>
					<div class="clearfix" />
				</h3>
				<hr />
			</div>
		)
	}
}

Title.propTypes = {
	title: React.PropTypes.string.isRequired,
	subTitle: React.PropTypes.string,
	backButtonLabel: React.PropTypes.string,
	loading: React.PropTypes.bool,
	children: React.PropTypes.element,
}
