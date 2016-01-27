define(['app', 'js/billingsModel', 'hbs!js/billingsEdit/billingsEdit'], function(app, Contact, editTemplate) {
	var $ = Dom7;

	function render(params) {

		var template = editTemplate({ model: params.model, state: params.state });
		app.f7.popup(template);
		
		var appearance = ('Slight Mucus,Opaque,Clear Strings,None').split(',');
		var pickerAppearance = app.f7.picker({
	        input: '#appearance',
	        cols: [
	            {
	                textAlign: 'center',
	                values: appearance
	            }
	        ]
	    });

	    var blood = ('Bleeding,Clots,Spots of blood,None').split(',');
		var pickerBlood = app.f7.picker({
	        input: '#blood',
	        cols: [
	            {
	                textAlign: 'center',
	                values: blood
	            }
	        ]
	    });

	    var quantity = ('Lots,Normal,Little,None').split(',');
		var pickerQuantity = app.f7.picker({
	        input: '#quantity',
	        cols: [
	            {
	                textAlign: 'center',
	                values: quantity
	            }
	        ]
	    });

	    var fluidity = ('Stringy (like eggwhite),Thin,Thick,Seminal Fluid,Creamy,None').split(',');
		var pickerFluidity = app.f7.picker({
	        input: '#fluidity',
	        cols: [
	            {
	                textAlign: 'center',
	                values: fluidity
	            }
	        ]
	    });

	    var sensations = ('Wet Sticky Dry Moist Damp Slippery').split(' ');
		var pickerSensations = app.f7.picker({
	        input: '#sensation',
	        cols: [
	            {
	                textAlign: 'center',
	                values: sensations
	            }
	        ]
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
		$('.js-billings-save-link').on('click', function() {
			var inputValues = $('.billings-edit-form input, textarea');			
			doneCallback(inputValues);
		});
	}

	return {
		render: render
	};
});