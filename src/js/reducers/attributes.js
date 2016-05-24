export default (state = {
	isFetching: false,
	isCreating: false,
	isUpdating: false,
	isDeleting: false,
	items: null,
	item: null
}, action) => {
	switch (action.type) {
	case 'FETCH_ATTRIBUTES':
		return Object.assign({}, state, {
			isFetching: true,
			items: null
		})
	case 'FETCHED_ATTRIBUTES':
		return Object.assign({}, state, {
			isFetching: false,
			items: action.items
		})
	case 'FETCH_ATTRIBUTE':
		return Object.assign({}, state, {
			isFetching: true,
			item: null
		})
	case 'FETCHED_ATTRIBUTE':
		return Object.assign({}, state, {
			isFetching: false,
			item: action.item
		})
	case 'CREATE_ATTRIBUTE':
		return Object.assign({}, state, {
			isCreating: true,
			item: null
		})
	case 'CREATED_ATTRIBUTE':
		return Object.assign({}, state, {
			isCreating: false,
			item: action.item
		})
	case 'UPDATE_ATTRIBUTE':
		return Object.assign({}, state, {
			isUpdating: true,
			item: null
		})
	case 'UPDATED_ATTRIBUTE':
		return Object.assign({}, state, {
			isUpdating: false,
			item: action.item
		})
	case 'DELETE_ATTRIBUTE':
		return Object.assign({}, state, {
			isDeleting: true,
			item: null
		})
	case 'DELETED_ATTRIBUTE':
		return Object.assign({}, state, {
			isDeleting: false,
			item: action.item
		})
	default:
		return state
	}
}
