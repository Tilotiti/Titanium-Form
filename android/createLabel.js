function createLabel(params) {
	
	var winForm = params.form;
	
	// Label
	var label = Ti.UI.createLabel({
		text: '\t'+params.title,
		width: 300,
		color: 'black',
		top: 10
	});
	winForm.add(label);
		
	// Picker
	if(params.type != 'text') {
		var picker = Ti.UI.createPicker({
			selectionIndicator: true,
			visible: true,
			width: 300,
			val: false
		});
	} else {
		var input = Ti.UI.createTextField({
			width: 300,
			visible: true,
			val: false,
			hintText: params.title
		});
	}
		
	switch(params.type) {
		case 'date':
			picker.type    = Ti.UI.PICKER_TYPE_DATE;
				
			picker.value   = new Date();
			picker.val 	   = new Date().toLocaleDateString();
				
			picker.addEventListener('change',function(e) {
				e.source.val = e.value.toLocaleDateString();
			});
				
			picker.reset = function() {
				picker.val   = new Date().toLocaleDateString();
				picker.value = new Date();
			}
		break;
		case 'text':
			input.addEventListener('change',function(e) {
				e.source.val = e.value;
			});
				
			input.reset = function() {
				input.val   = false;
				input.value = "";
			}
		break;
		default: // Type : data
			picker.add(Ti.UI.createPickerRow({
				value: 0,
				title: "Choose"
			}));
			
			picker.addEventListener('change',function(e) {
				e.source.val = e.row.value;
			});
				
			picker.reset = function() {
				picker.val   = false;
				picker.setSelectedRow(0, 0, true);
			}
		break;
	}
	
	if(params.type != "text") {
		winForm.add(picker);
		
		// Modifier les choix proposés
		picker.setData = function(array) {
			if(picker.columns[0]) {
				var _col = picker.columns[0];
				var len  = _col.rowCount;
				for(var x = len-1; x >= 0; x-- ){
					var _row = _col.rows[x];
				    _col.removeRow(_row);
				}
			}
				
			picker.add(Ti.UI.createPickerRow({
				id: 0,
				title: "Choose"
			}));
			picker.add(array);
			
		}
		
		// Retourne la valeur sélectionnée
		picker.getVal = function() {
			if(picker.val == 0 || picker.val == 'Choose' || !picker.val) {
				return false;
			}
				
			return picker.val;
		}
		return picker;
	} else {
		winForm.add(input);
		
		input.getVal = function() {
			if(input.val != "") { 
				return input.val;
			} else {
				return false;
			}
		}
		
		return input;
	}
	
}