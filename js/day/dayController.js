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
			element: '.js-notes-tab',
			event: 'click',
			handler: showNotes
		}
	];

	var billings = loadBillingsData();

	function init(){	
		DayView.render({
			model: billings,
			bindings: bindings
		});
	};

	function openAddPopup() {
		app.router.load('billingsEdit', {id: billings.id });
	}

	function showChart() {		
		var billings = loadBillingsData();
		DayView.reRender({ model: billings });
	}

	function showNotes() {		
		var billings = loadBillingsData();
		DayView.reRender({ model: billings });
	}

	function showObservations() {
		state.isFavorite = false;
		var billings = loadBillingsData();
		DayView.reRender({ model: billings });
	}

	function loadBillingsData(filter) {
		localStorage.clear();
		var localBillings = localStorage.getItem("billingsData");
		var billings = localBillings ? JSON.parse(localBillings) : tempInitializeStorage();
		// if (filter) {
		// 	billings = _.filter(billings, filter);
		// }
		if (filter && filter.id) {
			billings = new Billings(_.find(billings, { id: query.id }));
		}
		// billings = _.groupBy(billings, function(contact) { return contact.firstName.charAt(0); });
		// billings = _.toArray(_.mapValues(billings, function(value, key) { return { 'letter': key, 'list': value }; }));
		return billings;
	}

	function tempInitializeStorage() {
		var billings = [
			new Billings(),
			new Billings(),
			new Billings(),			
		];
		localStorage.setItem("billingsData", JSON.stringify(billings));
		return JSON.parse(localStorage.getItem("billingsData"));
	}
	return {
		init: init
	};
});