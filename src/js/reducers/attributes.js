export default (state = {}, action) => {
	switch (action.type) {
	case 'FETCH_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: true
		})
	case 'FETCHED_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: false,
			items: action.items
		})
	default:
		return state
	}
}
