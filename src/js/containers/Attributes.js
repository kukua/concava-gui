import { connect } from 'react-redux'
import AttributeList from '../components/attributes/List'
import attributeActions from '../actions/attributes'

const mapStateToProps = (state) => {
	return {
		isCreating: state.attributes.isCreating,
		isFetching: state.attributes.isFetching,
		items: state.attributes.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(attributeActions.fetchAll())
		},
		onCreate(data) {
			dispatch(attributeActions.create(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AttributeList)
