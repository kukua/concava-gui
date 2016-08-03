const initial = {
	loading: false,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'ATTRIBUTE_REORDER':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'ATTRIBUTE_REORDER_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
		})
	case 'ATTRIBUTE_REORDER_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
		})
	}

	return state
}
