import { connect } from 'react-redux'
import Login from '../../components/user/login'
import actions from '../../actions/user'

const mapStateToProps = (state) => {
	let { loading: isFetching, item } = state.user.login
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
