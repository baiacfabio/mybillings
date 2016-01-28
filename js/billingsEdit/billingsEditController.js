define(["app", "js/billingsModel", "js/billingsEdit/billingsEditView"], function(app, Billings, View) {

	var observation = null;
	var state = {
		isNew: false
	};
	var bindings = [{
		element: '.billings-delete-button',
		event: 'click',
		handler: deleteBillings
	}];

	function init(query){
		var data = JSON.parse(localStorage.getItem("billingsData"));
		if (query && query.date) {
			observation = new Billings(_.find(data, query));			
			state.isNew = false;
		}
		else {
			observation = new Billings();
			state.isNew = true;
		}
		View.render({ model: observation, bindings: bindings, state: state, doneCallback: saveBillings });
	}

	function deleteBillings() {
		app.f7.actions([[{
			text: 'Delete Observations',
			red: true,
			onClick: function() {
				var billings = JSON.parse(localStorage.getItem("billingsData"));
				_.remove(billings, { id: observation.id });
				localStorage.setItem("billingsData", JSON.stringify(billings));
				app.router.load('day', {date: observation.date}); // reRender main page view
				//app.mainView.goBack("index.html", false);
				app.f7.closeModal();
			}
		}], [{
			text: 'Cancel',
			bold: true
		}]]);
	}

	function saveBillings(inputValues) {		
		observation.setValues(inputValues);
		// if (!billings.validate()) {
		// 	app.f7.alert("First name and last name are empty");
		// 	return;
		// }
		var billings = JSON.parse(localStorage.getItem("billingsData"));
		if (!state.isNew) {
			_.remove(billings, { id: observation.id });
		}
		billings.push(observation);
		localStorage.setItem("billingsData", JSON.stringify(billings));
		app.router.load('day', {date: observation.date}); // reRender main page view
		//app.router.load('day'); // reRender main page view
		
		closePage();
	}

	function closePage() {
		// if (!state.isNew) {
		// 	app.router.load('day', {id: observation.id});
		// }
		// else {
		// 	app.mainView.loadPage('index.html?id=' + observation.id, false);
		// }
		app.router.load('day', {date: observation.date});
		app.f7.closeModal();
	}

	return {
		init: init
	};
});