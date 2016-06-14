import { connect } from 'react-redux'
import Notifications from '../../components/layout/notifications'

const mapStateToProps = (state) => {
	return { errors: state.error }
}

const mapDispatchToProps = (/*dispatch*/) => {
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notifications)
