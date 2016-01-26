define(['app'], function(app) {

    function Billings(values) {
    	var today = moment();
    	var id = app.utils.generateUUID();

		values = values || {};
		this.id = values['id'] || id;		
		this.createdOn = values['createdOn'] || new Date();

		this.timeStamp = values['timeStamp'] || today.valueOf();
		this.day = values['day'] || today.format('dddd');
		this.date = values['date'] || today.format('YYYY-MM-DD');
		this.isCycleStart = values['isCycleStart'] || false;
		this.intercourse = values['intercourse'] || false;
		//this.wait = values['wait'] || true;

		// Observations
		//this.isPeak = values['isPeak'] || false;
		this.swollen = values['swollen'] || false;
		
		this.appearance = values['appearance'] || '';
		this.sensation = values['sensation'] || '';
		this.fluidity = values['fluidity'] || '';
		this.quantity = values['quantity'] || '';
		this.blood = values['blood'] || '';
		//this.infertile = values['infertile'] || false;

		this.notes = values['notes'] || '';
		this.chart = values['chart'] || '';
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