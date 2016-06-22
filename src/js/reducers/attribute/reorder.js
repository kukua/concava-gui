const initial = {
	loading: false,
	err: null,
	data: null,
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
			data: action.data,
		})
	case 'ATTRIBUTE_REORDER_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
		})
	}

	return state
}
