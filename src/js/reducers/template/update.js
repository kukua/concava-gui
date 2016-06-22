const initial = {
	loading: false,
	err: null,
	data: null,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'TEMPLATE_UPDATE':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'TEMPLATE_UPDATE_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
			data: action.data,
		})
	case 'TEMPLATE_UPDATE_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			item: action.item,
		})
	}

	return state
}
