//import request from 'request'

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICES' })

			setTimeout(() => {
				let items = [
					{ id: 1, name: 'Device 1' },
					{ id: 2, name: 'Device 2' },
				]
				dispatch({ type: 'FETCHED_DEVICES', items })
			}, 1000)
		}
	},
	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE', id })

			setTimeout(() => {
				let item = { id, name: 'Device ' + id }
				dispatch({ type: 'FETCHED_DEVICE', item })
			}, 500)
		}
	}
}
