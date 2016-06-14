import React from 'react'
import { hashHistory } from 'react-router'

export default class Title extends React.Component {
	render () {
		let backButtonLabel = (this.props.backButtonLabel || 'Go back')

		return (
			<div>
				<div class="row">
					<div class="col-sm-10">
						<h3>
							{this.props.title}
							{this.props.subTitle && (<small> - {this.props.subTitle}</small>)}
						</h3>
					</div>
					<div class="col-sm-2 text-right">
						{backButtonLabel && ! this.props.loading &&
							<a href="javascript:;" class="btn-link-title" onClick={hashHistory.goBack}>
								&laquo; {backButtonLabel}
							</a>
						}
					</div>
				</div>
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
}
