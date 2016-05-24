export default (state = {
	isFetching: false,
	isCreating: false,
	isUpdating: false,
	isDeleting: false,
	items: null,
	item: null
}, action) => {
	switch (action.type) {
	case 'FETCH_DEVICES':
		return Object.assign({}, state, {
			isFetching: true,
			items: null
		})
	case 'FETCHED_DEVICES':
		return Object.assign({}, state, {
			isFetching: false,
			items: action.items
		})
	case 'FETCH_DEVICE':
		return Object.assign({}, state, {
			isFetching: true,
			item: null
		})
	case 'FETCHED_DEVICE':
		return Object.assign({}, state, {
			isFetching: false,
			item: action.item
		})
	case 'CREATE_DEVICE':
		return Object.assign({}, state, {
			isCreating: true,
			item: null
		})
	case 'CREATED_DEVICE':
		return Object.assign({}, state, {
			isCreating: false,
			item: action.item
		})
	case 'UPDATE_DEVICE':
		return Object.assign({}, state, {
			isUpdating: true,
			item: null
		})
	case 'UPDATED_DEVICE':
		return Object.assign({}, state, {
			isUpdating: false,
			item: action.item
		})
	case 'DELETE_DEVICE':
		return Object.assign({}, state, {
			isDeleting: true,
			item: null
		})
	case 'DELETED_DEVICE':
		return Object.assign({}, state, {
			isDeleting: false,
			item: action.item
		})
	default:
		return state
	}
}
