import { connect } from 'react-redux'
import Delete from '../../components/attributes/Delete'
import actions from '../../actions/attributes'

const mapStateToProps = (state) => {
	let { isFetching, isDeleting, item } = state.attributes
	return { isFetching, isDeleting, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onDelete (id) {
			dispatch(actions.delete(id))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Delete)
