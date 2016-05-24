import { connect } from 'react-redux'
import Register from '../../components/users/Register'
import actions from '../../actions/users'

const mapStateToProps = (state) => {
	let { isCreating, item } = state.users
	return { isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate (data) {
			dispatch(actions.create(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)
