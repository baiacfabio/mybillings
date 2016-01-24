define(["app","js/day/dayView", "js/billingsModel"], function(app, DayView, Billings) {

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

	function init(){
		var query = {};
		var billings = JSON.parse(localStorage.getItem("billingsData"));
		if (query && query.id) {
			billings = new Billings(_.find(billings, { id: query.id }));
		}
		console.log("dayView");
		DayView.render({
			model: billings,
			bindings: bindings
		});
	};

	function openAddPopup() {
		app.router.load('billingsEdit', {id: billings.id });
	}

	function showChart() {
		state.isFavorite = false;
		var billings = loadBillingsData();
		DayView.reRender({ model: billings, header: "Chart" });
	}

	function showNotes() {
		state.isFavorite = false;
		var billings = loadBillingsData();
		DayView.reRender({ model: billings, header: "Notes" });
	}

	function showObservations() {
		state.isFavorite = false;
		var billings = loadBillingsData();
		DayView.reRender({ model: billings, header: "Observations" });
	}

	function loadBillingsData(filter) {
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

	return {
		init: init
	};
});