const initial = {
	loading: false,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'DEVICE_CREATE':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'DEVICE_CREATE_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
		})
	case 'DEVICE_CREATE_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			item: action.item,
		})
	}

	return state
}
