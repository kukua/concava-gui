import { connect } from 'react-redux'
import AttributeList from '../components/attributes/List'
import attributeActions from '../actions/attributes'

const mapStateToProps = (state) => {
	console.log(state.attributes)
	return {
		isFetching: state.attributes.isFetching,
		items: state.attributes.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(attributeActions.fetchAll())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AttributeList)
