import { connect } from 'react-redux'
import Login from '../../components/users/Login'
import actions from '../../actions/users'

const mapStateToProps = (state) => {
	let { isFetching, item } = state.users
	return { isFetching, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin (email, password) {
			dispatch(actions.login(email, password))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
