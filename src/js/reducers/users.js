export default (state = {
	isFetching: false,
	isCreating: false,
	item: null
}, action) => {
	switch (action.type) {
	case 'LOGIN_ATTEMPT':
		return Object.assign({}, state, {
			isFetching: true,
			item: null
		})
	case 'LOGIN_SUCCESS':
		return Object.assign({}, state, {
			isFetching: false,
			item: action.item
		})
	case 'CREATE_USER':
		return Object.assign({}, state, {
			isCreating: true,
			item: null
		})
	case 'CREATED_USER':
		return Object.assign({}, state, {
			isCreating: false,
			item: action.item
		})
	default:
		return state
	}
}
