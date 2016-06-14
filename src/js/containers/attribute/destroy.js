import { connect } from 'react-redux'
import Destroy from '../../components/attribute/destroy'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isDeleting, item } = state.attribute.destory
	let { loading: isFetching, item: fetchedItem } = state.attribute.fetch
	if ( ! item) item = fetchedItem
	return { isFetching, isDeleting, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onDestroy (id) {
			dispatch(actions.destroy(id))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Destroy)
