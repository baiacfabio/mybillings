define(['app'], function(app) {

    function Billings(values) {
    	var today = moment();
    	var id = app.utils.generateUUID();
    	console.log(id);
		values = values || {};
		this.id = values['id'] || id;		
		this.createdOn = values['createdOn'] || new Date();

		this.timeStamp = values['timeStamp'] || today.valueOf();
		this.day = values['day'] || today.format('dddd');
		this.observation = {} || null;
		this.observation['isPeak'] = values['isPeak'] || false;
		this.observation['wait'] = values['wait'] || '';
		this.observation['appearance'] = values['appearance'] || '';
		this.observation['sensation'] = values['sensation'] || '';
		this.observation['symptomDescription'] = values['symptomDescription'] || '';
		this.observation['quantity'] = values['quantity'] || '';
		this.observation['blood'] = values['blood'] || '';
		this.observation['infertile'] = values['infertile'] || false;
		this.notes = values['notes'] || undefined;
		this.chart = values['chart'] || undefined;
    }

	Billings.prototype.setValues = function(inputValues) {
		for (var i = 0, len = inputValues.length; i < len; i++) {
			var item = inputValues[i];
			if (item.type === 'checkbox') {
				this[item.id] = item.checked;
			}
			else {
				this[item.id] = item.value;
			}
		}
	};

	Billings.prototype.validate = function() {
		var result = true;
		if (_.isEmpty(this.firstName) && _.isEmpty(this.lastName)) {
			result = false;
		}
		return result;
	};

    return Billings;
});