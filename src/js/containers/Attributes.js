import { connect } from 'react-redux'
import attributeList from '../components/attributes/List'
import attributeActions from '../actions/attributes'

const mapStateToProps = (state) => {
	return {
		isCreating: state.attributes.isCreating,
		isFetching: state.attributes.isFetching,
		device: state.attributes.device
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(attributeActions.fetchAll(id))
		},
		onCreate(data) {
			dispatch(attributeActions.create(data))
		},
		onUpdate(data) {
			dispatch(attributeActions.update(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(attributeList)
