define(['app', 'js/billingsModel', 'hbs!js/billingsEdit/billingsEdit'], function(app, Contact, editTemplate) {
	var $ = Dom7;

	function render(params) {
		var template = editTemplate({ model: params.model, state: params.state });
		app.f7.popup(template);

		// Dropdown with all values
		var sensations = ('Wet Sticky Dry Moist Damp Slippery').split(' ');
    	var autocompleteDropdownAll = app.f7.autocomplete({
	        input: '#dropdown-sensation',
	        openIn: 'dropdown',
	        source: function (autocomplete, query, render) {
	            var results = [];
	            // Find matched items
	            for (var i = 0; i < sensations.length; i++) {
	                if (sensations[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(sensations[i]);
	            }
	            // Render items by passing array with result items
	            render(results);
	        }
	    });

		bindEvents(params.bindings);
		bindSaveEvent(params.doneCallback);
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function bindSaveEvent(doneCallback) {
		$('.billings-save-link').on('click', function() {
			var inputValues = $('.billings-edit-form input');
			doneCallback(inputValues);
		});
	}

	return {
		render: render
	};
});