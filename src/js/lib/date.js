import moment from 'moment-timezone'
import config from '../config'

const defaultFormat = config.datetimes.defaultFormat
const timezone = config.datetimes.timezone

//moment.defaultFormat = defaultFormat
//moment.tz.setDefault(timezone)

export default {
	format (datetime) {
		return moment.tz(timezone).utc(datetime).format(defaultFormat)
	}
}
