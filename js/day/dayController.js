define(["app", "js/billingsModel", "js/day/dayView"], function(app, Billings, DayView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [
		{
			element: '.js-billings-add-link',
			event: 'click',
			handler: openAddPopup
		}, 
		{
			element: '.js-observations-tab',
			event: 'click',
			handler: showObservations
		}, 
		{
			element: '.js-chart-tab',
			event: 'click',
			handler: showChart
		}
	];
	var isNew = false;
	var $ = Dom7;
	var query = {};
	var date = new Date($('#mb-picker-date').val());	
	query["date"] = moment(+date).format('YYYY-MM-DD');	
	var billings = loadBillingsData(query);

	var calendarDefault = app.f7.calendar({
		input: '#mb-picker-date', dateFormat: 'DD, MM dd, yyyy', value: [new Date()],
		onChange: function(p, values, displayValues) {			
			var q = {};
			q["date"] = moment(values[0]).format('YYYY-MM-DD');	
			var observations = loadBillingsData(q);						
			DayView.reRender({ model: observations });
		}
	});	
	

	function init(){	
		DayView.render({
			model: billings,
			bindings: bindings
		});
	};

	function openAddPopup(e) {
		var d = new Date($('#mb-picker-date').val());
		var date = moment(+d).format('YYYY-MM-DD');
		var q = (!isNew) ? {date: date } : null;
		app.router.load('billingsEdit', q );		
	};

	function showChart() {				
		var billings = loadBillingsData(query);
		DayView.reRender({ model: billings });
	};

	function showObservations() {
		var d = new Date($('#mb-picker-date').val()),
			date = moment(+d).format('YYYY-MM-DD'),
			q = {};
		q["date"] = date;	
		console.log(q);
		var observation = loadBillingsData(q);
		console.log(observation);
		DayView.reRender({ model: billings });
	};

	function loadBillingsData(filter) {
		//localStorage.clear();
		var localBillings = localStorage.getItem("billingsData");
		var observations = localBillings ? JSON.parse(localBillings) : tempInitializeStorage();
		var observation = null
		// if (filter) {
		// 	billings = _.filter(billings, filter);
		// }		
		if (filter && filter.date) {
			var o = _.find(observations, filter);			
			observation = new Billings(o);			
			isNew = (o === undefined);			
		}
		// billings = _.groupBy(billings, function(contact) { return contact.firstName.charAt(0); });
		// billings = _.toArray(_.mapValues(billings, function(value, key) { return { 'letter': key, 'list': value }; }));
		return observation;
	};

	function tempInitializeStorage() {
		var billings = [
			new Billings({ "date": "2016-01-19", "day": "Tuesday", "isCycleStart": true, "sensation": "Wet", quantity: "Lots", "blood": "Bleeding", fluidity: "Thick", notes: "An unchanging discharge that produces the same sensation and appearance day after day. "}),
			new Billings({ "date": "2016-01-20", "day": "Wednesday", "sensation": "Moist", quantity: "Normal", "blood": "bleeding", fluidity: "Stringy (like eggwhite)", "notes": "The vulva feels dry. Nothing is seen."}),
			new Billings({ "date": "2016-01-21", "day": "Thursday", "sensation": "Wet", quantity: "Normal", "blood": "bleeding", fluidity: "Thin", "notes": "Heavy bleeding obscures mucus when ovulation is early"}),
		];
		localStorage.setItem("billingsData", JSON.stringify(billings));
		return JSON.parse(localStorage.getItem("billingsData"));
	};
	
	return {
		init: init
	};
});