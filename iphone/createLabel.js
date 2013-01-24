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
	
	// Input
	var input = Ti.UI.createTextField({
		width: 300,
		height: 40,
		visible: true,
		val: false,
		hintText: 'Choose',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		val: false
	});
	winForm.add(input);
	
	// Confirm
	var confirm = Ti.UI.createButton({
		title           : "OK",
		textAlign       : "center",
		right           : 15,
		width           : 70,
		height          : 40,
		bottom 			: 164,
		visible         : false,
		zIndex          : 4998,
		color           : '#fff',
		borderRadius    : '5',
		font            : {
			fontWeight  : 'bold',
			fontSize	: '17sp'
		},
		shadowColor     : '#333',
		shadowOffset    : {
			x           : 0,
			y           : -1
		}
	});
	Ti.UI.currentWindow.add(confirm);
	
	// Confirm Invisible
	var confirmInvisible = Ti.UI.createView({
		top     : 0,
		left    : 0,
		width   : "100%",
		height  : "100%",
		visible : false,
		zIndex  : 4999,
	});
	Ti.UI.currentWindow.add(confirmInvisible);
	
	if(params.type != 'text') {
		confirm.bottom = 213;
		
		var tr = Titanium.UI.create2DMatrix();
		tr = tr.rotate(90);
		 
		var dropButton =  Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			transform:tr
		});
		
		input.rightButton = dropButton;
		input.ButtonMode; Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
		
		var picker = Ti.UI.createPicker({
			selectionIndicator: true,
			visible: false,
			bottom: 0,
			zIndex: 5000
		});
		
		Ti.UI.currentWindow.add(picker);
		
		input.addEventListener('focus', function () {
			picker.show();
			input.blur();
		});
		
		confirm.addEventListener('click', function() {
			picker.hide();
		});
		
		confirmInvisible.addEventListener('click', function() {
			picker.hide();
		});
		
		// Ajout de l'indicateur de choix
		
		
	}
	
	input.addEventListener('focus', function () {
		confirm.show();
		confirmInvisible.show();
	});
	
	confirm.addEventListener('click', function() {
		input.blur();
		confirm.hide();
		confirmInvisible.hide();
	});
	
	confirmInvisible.addEventListener('click', function() {
		input.blur();
		confirm.hide();
		confirmInvisible.hide();
	});
		
	switch(params.type) {
		case 'date':
			picker.type    = Ti.UI.PICKER_TYPE_DATE;
				
			picker.value   = new Date();
			picker.val     = new Date().toLocaleDateString();
				
			picker.addEventListener('change',function(e) {
				input.value  = e.value.toLocaleDateString();
				e.source.val = e.value.toLocaleDateString();
			});
				
			picker.reset = function() {
				picker.val   = new Date().toLocaleDateString();
				picker.value = new Date();
				input.value  = "";
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
				input.value  = e.row.title;
			});
				
			picker.reset = function() {
				picker.val   = false;
				input.value  = "";
				picker.setSelectedRow(0, 0, true);
			}
		break;
	}
	
	if(params.type != "text") {
		
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
			if(picker.val == 0 || !picker.val) {
				return false;
			}
				
			return picker.val;
		}
		return picker;
	} else {
		
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