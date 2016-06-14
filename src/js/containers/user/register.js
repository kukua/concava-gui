import { connect } from 'react-redux'
import Register from '../../components/user/register'
import actions from '../../actions/user'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.user.create
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
