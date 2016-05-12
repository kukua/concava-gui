import { connect } from 'react-redux'
import DeviceList from '../components/devices/List'
import deviceActions from '../actions/devices'

const mapStateToProps = (state) => {
	return {
		isFetching: state.devices.isFetching,
		items: state.devices.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(deviceActions.fetchAll())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeviceList)
