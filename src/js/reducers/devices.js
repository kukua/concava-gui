export default (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_DEVICES':
			return Object.assign({}, state, {
				isFetching: true
			})
		case 'FETCH_DEVICE':
			return Object.assign({}, state, {
				isFetching: true
			})
		case 'FETCHED_DEVICES':
			return Object.assign({}, state, {
				isFetching: false,
				items: action.items
			})
		case 'FETCHED_DEVICE':
			return Object.assign({}, state, {
				isFetching: false,
				item: action.item
			})
		default:
			return state
	}
}
