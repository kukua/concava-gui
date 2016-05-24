import { connect } from 'react-redux'
import Create from '../../components/attributes/Create'
import actions from '../../actions/attributes'

const mapStateToProps = (state) => {
	let { isFetching, isCreating, item } = state.attributes
	return { isFetching, isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onCreate (data) {
			dispatch(actions.create(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
