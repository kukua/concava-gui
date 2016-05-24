import { connect } from 'react-redux'
import Update from '../../components/attributes/Update'
import actions from '../../actions/attributes'

const mapStateToProps = (state) => {
	let { isFetching, isUpdating, item } = state.attributes
	return { isFetching, isUpdating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			dispatch(actions.update(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
