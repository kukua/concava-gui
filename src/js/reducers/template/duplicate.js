const initial = {
	loading: false,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'TEMPLATE_DUPLICATE':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'TEMPLATE_DUPLICATE_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
		})
	case 'TEMPLATE_DUPLICATE_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			item: action.item,
		})
	}

	return state
}
