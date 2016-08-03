const initial = {
	loading: false,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'DEVICE_FETCH':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'DEVICE_FETCH_FAIL':
		return Object.assign({}, initial, {
			loading: false,
			err: action.err,
		})
	case 'DEVICE_FETCH_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			item: action.item,
		})
	}

	return state
}
