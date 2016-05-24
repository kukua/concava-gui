export default (state = {}, action) => {
	switch (action.type) {
	case 'FETCH_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: true,
			isCreating: false
		})
	case 'FETCHED_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: false,
			isCreating: false,
			device: action.items
		})
	case 'CREATE_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: false,
			isCreating: true
		})
	case 'CREATED_DEVICE_ATTR':
		return Object.assign({}, state, {
			isFetching: false,
			isCreating: false
		})
	default:
		return state
	}
}
