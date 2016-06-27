import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import { instance as user } from '../../lib/user'
import actions from '../../actions/user'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.user.create
	return { isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate (data) {
			dispatch(actions.create(data))
		},
		onLogin (data) {
			dispatch({ type: 'USER_LOGIN_SUCCESS', item: data })
		},
		onError (err) {
			dispatch({ type: 'ERROR_ADD', err })
		},
	}
}

class Register extends React.Component {
	onSubmit (ev) {
		ev.preventDefault()

		let form = ev.target
		let password = form.password.value
		let passwordConfirm = form.password_confirmation.value

		if (password !== passwordConfirm) {
			this.props.onError('The passwords do not match.')
			return
		}

		this.props.onCreate({
			name: form.name.value,
			email: form.email.value,
			password,
		})
	}

	componentWillReceiveProps (next) {
		if ( ! next.isCreating && next.item) {
			user.set(next.item)
			this.context.router.replace('/')
			this.props.onLogin(next.item)
		}
	}

	render() {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Register" button="Go back"/>
					<form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="name">Name</label>
							<div class="col-sm-6">
								<input type="name" id="name" name="name" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="email">E-mail address</label>
							<div class="col-sm-6">
								<input type="email" id="email" name="email" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="password">Password</label>
							<div class="col-sm-6">
								<input type="password" id="password" name="password" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="password_confirmation">Password (confirm)</label>
							<div class="col-sm-6">
								<input type="password" id="password_confirmation" name="password_confirmation" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label"></label>
							<div class="col-sm-6">
								<button type="submit" class="btn btn-success pull-left">Register</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

Register.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	isCreating: React.PropTypes.bool.isRequired,
	onLogin: React.PropTypes.func.isRequired,
	onError: React.PropTypes.func.isRequired,
}
Register.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)
