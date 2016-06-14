import { connect } from 'react-redux'
import Create from '../../components/attribute/create'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.attribute.create
	let { loading: isFetching, item: fetchedItem } = state.attribute.fetch
	if ( ! item) item = fetchedItem
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
