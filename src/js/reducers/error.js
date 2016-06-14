export default (state = [], action) => {
	switch (action.type) {
	case 'ERROR_ADD':
		return state.concat([
			{
				err: action.err,
				data: action.data,
				date: new Date(),
			}
		])
	}

	return state
}
