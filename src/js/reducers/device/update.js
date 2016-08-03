const initial = {
	loading: false,
}

export default (state = initial, action) => {
	switch (action.type) {
	case 'DEVICE_UPDATE':
		return Object.assign({}, initial, {
			loading: true,
		})
	case 'DEVICE_UPDATE_FAIL':
		return Object.assign({}, initial, {
			loading: false,
		})
	case 'DEVICE_UPDATE_SUCCESS':
		return Object.assign({}, initial, {
			loading: false,
			item: action.item,
		})
	}

	return state
}
