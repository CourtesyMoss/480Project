#pragma strict

var customSkin : GUISkin;
var force : float = 10.0;
var searchResults = new Array();
static var shoppingTrolley = new Array();
static var amountArr = new Array();
var showResults : boolean = false;
var showDefault : boolean = false;
var showQuantity : boolean = false;
var showReturn : boolean = true;
var showArr = new Array();

var stringToEdit : String = "";
var amount : String = "";

var moveJoystick : Joystick;
var rotateJoystick : Joystick;

function Start() {
	shoppingTrolley = new Array();
	amountArr = new Array();
//	for (var item in shoppingTrolley) {
//		print("deleting the items");
//		item = null;
//	}
}

function OnGUI() {
	GUI.skin = customSkin;
	
	if (onHit.showFoods == true) {
		moveJoystick.guiTexture.enabled = false;
		rotateJoystick.guiTexture.enabled = false;
		moveJoystick.enabled = false;
		rotateJoystick.enabled = false;
		showResults = true;
		showArr = onHit.currentItemArr;
		onHit.showFoods = false;
		//if (GUI.Button(Rect
		
	}
	
	else if (onHit.showSearch == true) {
		moveJoystick.guiTexture.enabled = false;
		rotateJoystick.guiTexture.enabled = false;
		moveJoystick.enabled = false;
		rotateJoystick.enabled = false;
		GUI.Label(Rect(Screen.width/2-135, Screen.height/2-60, 270, 75), "What are you wanting to find?");
		stringToEdit = GUI.TextField (Rect (Screen.width/2-50, Screen.height/2, 100, 40), stringToEdit, 20);
		if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Enter")) {
			searchResults = FoodDatabase.search(stringToEdit);
			showResults = true;
			showArr = searchResults;
			onHit.showSearch = false;
		}
	}
	
	else if (showResults == true) {
		displayResults(showArr);
	}
	
	else if (showQuantity == true) {		
		if (Event.current.character < "0"[0] || Event.current.character > "9"[0]) {
    	    Event.current.character = "\0"[0];
    	}
		GUI.Label(Rect(Screen.width/2-135, Screen.height/2-60, 270, 75), "How much do you want?");
		amount = GUI.TextField (Rect (Screen.width/2-50, Screen.height/2, 100, 40), amount, 5);
		if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Enter")) {
			amountArr.push(amount);
			showQuantity = false;
			showDefault = true;
		}
	}
	
	else if (showDefault == true) {
		moveJoystick.guiTexture.enabled = true;
		rotateJoystick.guiTexture.enabled = true;
		moveJoystick.enabled = true;
		rotateJoystick.enabled = true;
		showDefault = false;
		showReturn = true;
	}
	else if (showReturn == true) {
		if (GUI.Button (Rect (10, 10, 200, 75), "Return")) {
			Application.LoadLevel("mainScene");
		}
	}
	var off : int = 110;
	for (var result : String in shoppingTrolley) {
		GUI.Label(Rect(10, off, 300, 75), result);
		off += 50;
	}

}

function displayResults(showArr : Array) {
	var offset : int = 10;
	for (var result : String in showArr) {
		if (GUI.Button (Rect (Screen.width/2-150, offset, 256, 75), result)) {
			shoppingTrolley.push(result);
			showResults = false;
			showQuantity = true;
		}
		offset += 100;
	}
	if (showArr.length == 0) {
		GUI.Label(Rect(Screen.width/2-100, Screen.height/2-60, 200, 75), "No results were found.");
		if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Back")) {
			showResults = false;
			showDefault = true;
		}
	}
}