

let items = [
	{order: 0, id: 1, name: 'Temperature', convert: 'uint32', calibrate: 'Value / 10', validate: 'Min: -50; Max: 50' },
	{order: 1, id: 2, name: 'Humidity', convert: 'uint16', calibrate: 'Value / 10', validate: '' },
	{order: 2, id: 3, name: 'Pressure', convert: 'int32', calibrate: '', validate: '' }
]

export default {
	fetchAll() {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE_ATTR'})
			setTimeout(() => {
				dispatch({ type: 'FETCHED_DEVICE_ATTR', items })
			}, 500)
		}
	},

	create(data) {
		return (dispatch) => {
			dispatch({ type: 'CREATE_DEVICE_ATTR'})

			setTimeout(() => {
				items.push(data)
				dispatch({ type: 'CREATED_DEVICE_ATTR', items })
			}, 500)
		}
	}
}