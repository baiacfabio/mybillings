define(["app", "js/billingsModel", "js/billingsEdit/billingsEditView"], function(app, Billings, View) {

	var billings = null;
	var state = {
		isNew: false
	};
	var bindings = [{
		element: '.billings-delete-button',
		event: 'click',
		handler: deleteBillings
	}];

	function init(query){
		var billings = JSON.parse(localStorage.getItem("billingsData"));
		if (query && query.id) {
			billings = new Billings(_.find(billings, { id: query.id }));
			state.isNew = false;
		}
		else {
			billings = new Billings({ isFavorite: query.isFavorite });
			state.isNew = true;
		}
		View.render({ model: billings, bindings: bindings, state: state, doneCallback: saveBillings });
	}

	function deleteBillings() {
		app.f7.actions([[{
			text: 'Delete Billings',
			red: true,
			onClick: function() {
				var billings = JSON.parse(localStorage.getItem("billingsData"));
				_.remove(billings, { id: billings.id });
				localStorage.setItem("billingsData", JSON.stringify(billings));
				app.router.load('list'); // reRender main page view
				app.mainView.goBack("index.html", false);
				app.f7.closeModal();
			}
		}], [{
			text: 'Cancel',
			bold: true
		}]]);
	}

	function saveBillings(inputValues) {
		billings.setValues(inputValues);
		if (!billings.validate()) {
			app.f7.alert("First name and last name are empty");
			return;
		}
		var billings = JSON.parse(localStorage.getItem("billingsData"));
		if (!state.isNew) {
			_.remove(billings, { id: billings.id });
		}
		billings.push(billings);
		localStorage.setItem("billingsData", JSON.stringify(billings));
		app.router.load('list'); // reRender main page view
		closePage();
	}

	function closePage() {
		if (!state.isNew) {
			app.router.load('billings', {id: billings.id});
		}
		else {
			app.mainView.loadPage('billings.html?id=' + billings.id, false);
		}
		app.f7.closeModal();
	}

	return {
		init: init
	};
});