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
		},
		{
			element: 'js-current-date',
			event: 'change',
			handler: getCurrentDate
		}
	];
	var $ = Dom7;
	var query = {};
	var date = new Date($('#mb-picker-date').val());	
	query["date"] = moment(+date).format('YYYY-MM-DD');	
	var billings = loadBillingsData(query);


	function getCurrentDate(event){
		console.log(event);
		var date = moment($('#mb-picker-date').val()).format('YYYY-MM-DD');
		console.log(date);
	};

	function init(){	
		DayView.render({
			model: billings,
			bindings: bindings
		});
	};

	function openAddPopup(e) {
		var obj = (window.PickerDate === date) ? {id: billings.id } : null;
		app.router.load('billingsEdit', obj );		
	};

	function showChart() {				
		var billings = loadBillingsData(query);
		DayView.reRender({ model: billings });
	};

	function showObservations() {
		var date = window.PickerDate;	
		query["date"] = moment(+date).format('YYYY-MM-DD');	
		var billings = loadBillingsData(query);
		DayView.reRender({ model: billings });
	};

	function loadBillingsData(filter) {
		localStorage.clear();
		var localBillings = localStorage.getItem("billingsData");
		var billings = localBillings ? JSON.parse(localBillings) : tempInitializeStorage();
		// if (filter) {
		// 	billings = _.filter(billings, filter);
		// }
		if (filter && filter.date) {
			billings = new Billings(_.find(billings, { date: filter.date }));
		}
		// billings = _.groupBy(billings, function(contact) { return contact.firstName.charAt(0); });
		// billings = _.toArray(_.mapValues(billings, function(value, key) { return { 'letter': key, 'list': value }; }));
		return billings;
	};

	function tempInitializeStorage() {
		var billings = [
			new Billings({ "date": "2015-01-19", "day": "Monday", "isCycleStart": true, "sensation": "wet", "blood": "bleeding", "notes": "An unchanging discharge that produces the same sensation and appearance day after day. "}),
			new Billings({ "date": "2015-01-20", "day": "Monday", "sensation": "wet", "blood": "bleeding", "notes": "The vulva feels dry. Nothing is seen."}),
			new Billings({ "date": "2015-01-21", "day": "Monday", "sensation": "wet", "blood": "bleeding", "notes": "Heavy bleeding obscures mucus when ovulation is early"}),
		];
		localStorage.setItem("billingsData", JSON.stringify(billings));
		return JSON.parse(localStorage.getItem("billingsData"));
	};
	
	return {
		init: init
	};
});