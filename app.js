var form = Ti.UI.createScrollView({
	width: 320,
	top: 30,
	height: '90%',
	layout: 'vertical',
	contentHeight:'auto',
	showHorizontalScrollIndicator: false,
	showVerticalScrollIndicator: false,
	visible: false
});
win.add(form);

var data = {};

var inputFirstName = new createLabel({
	title: 'First Name :',
	type:  'text',
	form:  form
});

var inputLastName = new createLabel({
	title: 'Last Name :',
	type:  'text',
	form:  form
});

var inputBirthDay = new createLabel({
	title: 'Birthday :',
	type:  'date',
	form:  form
});

var inputRank = new createLabel({
	title: 'Rank :',
	name:  'hour1',
	form:  form
});

var pickerData = [];

pickerData.push(Ti.UI.createPickerRow({
	title: "Administration",
	value: "admin"
}));


pickerData.push(Ti.UI.createPickerRow({
	title: "Manager",
	value: "manager"
}));


pickerData.push(Ti.UI.createPickerRow({
	title: "User",
	value: "user"
}));

inputRank.setData(pickerData);

inputRank.addEventListener('change', function(e) {
	alert(inputRank.getVal());
});

// Form submit
var buttonSubmit = Ti.UI.createButton({
	title           : "Submit",
	textAlign       : "center",
	width           : 300,
	height          : 35,
	top				: 10,
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
	
form.add(buttonSubmit);

buttonSubmit.addEventListener('click', function(e) {
	
	if(!inputFirstname.getVal()) {
		alert("Please, specify your firstname.");
		return false;
	}
	
	if(!inputLastname.getVal()) {
		alert("Please, specify your lastname.");
		return false;
	}
	
	if(!inputRank.getVal()) {
		alert("Please, specify your rank.");
		return false;
	}
	
	var submit = {
		firstname : inputFirstname,
		lastName  : inputLastName,
		birthday  : inputBirthday,
		rank      : inputRank
	}
	
	alert(JSON.stringify(submit));
});