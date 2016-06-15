import _ from 'underscore'

export default (item) => ({
	converter: (item.converters && item.converters[0] && item.converters[0].type),
	calibrator: (item.calibrators && item.calibrators[0] && item.calibrators[0].fn),
	validators: (_.size(item.validators) && _.map(item.validators, (validator) => (
		validator.type + '=' + validator.value
	)).join(' ') || ''),
})
