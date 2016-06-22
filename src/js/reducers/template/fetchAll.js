const initial = {
	loading: false,
	err: null,
	data: null,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'TEMPLATE_FETCH_ALL':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'TEMPLATE_FETCH_ALL_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
			data: action.data,
		})
	case 'TEMPLATE_FETCH_ALL_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			items: action.items,
		})
	}

	return state
}
