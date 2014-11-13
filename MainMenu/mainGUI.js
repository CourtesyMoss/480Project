#pragma strict

var stateIndex : int = 0;
var stateOfDay = new Array();

var totalEnergy : float = 0.0;
var totalFat : float = 0.0;
var totalProtein : float = 0.0;

var tempE : float = 0.0;
var tempF : float = 0.0;
var tempP : float = 0.0;

var shoppingGoods = new Array();

var showSettings : boolean = false;
var changeA : boolean = false;
var changeG : boolean = false;
var changeW : boolean = false;
var setTime : boolean = false;
var showSummary : boolean = false;

var customSkin : GUISkin;
var defor : deformMesh; // an instance of the deformMesh class to access the methods

stateOfDay.push("breakfast");
stateOfDay.push("lunch");
stateOfDay.push("dinner");

var stringToEdit : String = "";
var weightToEdit : String = "";

static var gender : int;
static var age : int;
static var weight : int;
static var startGUI : int = 1;

static var bmr : int;

function Start() {

	defor = gameObject.AddComponent(deformMesh);
	if(PlayerPrefs.HasKey("startGUI")){
	   // there is a saved level, load that one
	   startGUI = PlayerPrefs.GetInt("startGUI");
	   gender = PlayerPrefs.GetInt("gender");
	   age = PlayerPrefs.GetInt("age");
	   weight = PlayerPrefs.GetFloat("weight");
	}
	if (!PlayerPrefs.HasKey("weeks")) {
		PlayerPrefs.SetInt("weeks", 1);
	}
	if (startGUI != 1) {
		calculateBMR(age, weight, gender);
	}

	if(PlayerPrefs.HasKey("stateIndex")){
	   stateIndex = PlayerPrefs.GetInt("stateIndex");
	}

	var shoppingGoods = new Array();
	for (var item : String in GUIControls.shoppingTrolley) {
		shoppingGoods.push(item);
    }
    var amountArr = new Array();
	for (var item : String in GUIControls.amountArr) {
		amountArr.push(item);
    }
	if (shoppingGoods.length > 0) {
		var indices = new Array();
		for (var item : String in shoppingGoods) {
			var index : int = FoodDatabase.searchIndex(item);
			indices.push(index);
		}
		var i : int;
		for (i = 0; i < indices.length; i++) {
			var food : FoodObject = FoodDatabase.foodArray[indices[i]];
			var amountStr : String = amountArr[i].ToString();
			var amount : int = int.Parse(amountStr);
			totalEnergy += food.energy * (amount/food.measure);
			totalFat += food.fat * (amount/food.measure);
			totalProtein += food.protein * (amount/food.measure);
		}
		PlayerPrefs.SetFloat("totalEnergy", totalEnergy);
		PlayerPrefs.SetFloat("totalFat", totalFat);
		PlayerPrefs.SetFloat("totalProtein", totalProtein);
	}
	if(PlayerPrefs.HasKey("totalEnergy")){
	   totalEnergy = PlayerPrefs.GetFloat("totalEnergy");
	}
	if(PlayerPrefs.HasKey("totalFat")){
	   totalFat = PlayerPrefs.GetFloat("totalFat");
	}
	if(PlayerPrefs.HasKey("totalProtein")){
	   totalProtein = PlayerPrefs.GetFloat("totalProtein");
	}
	tempE = totalEnergy;
	tempF = totalFat;
	tempP = totalProtein;
	print ("state index " + stateIndex);
	if (stateIndex == 0) {
		totalEnergy = 0;
		totalFat = 0;
		PlayerPrefs.SetFloat("totalEnergy", 0);
		PlayerPrefs.SetFloat("totalFat", 0);
		PlayerPrefs.SetFloat("totalProtein", 0);
		showSummary = true;
	}
//	else if (stateIndex >= stateOfDay.length) {
//		print ("resetting state index");
//		stateIndex = 0;
//	}
}

function OnGUI() {
	
	GUI.skin = customSkin;
	if (startGUI == 1) {
		GUI.Label(Rect(Screen.width/2, Screen.height/2-60, 150, 75), "Are you male or female?");
		if (GUI.Button (Rect (Screen.width/2-100, Screen.height/2, 150, 100), "Male")) {
			gender = 1;
			PlayerPrefs.SetInt("gender", gender);
			startGUI = 2;
		}
		if (GUI.Button (Rect (Screen.width/2+100, Screen.height/2, 150, 100), "Female")) {
			gender = 0;
			PlayerPrefs.SetInt("gender", gender);
			startGUI = 2;
		}
	}
	else if (startGUI == 2) {
		GUI.Label(Rect(Screen.width/2, Screen.height/2-60, 150, 75), "How old are you in years?");
		stringToEdit = GUI.TextField (Rect (Screen.width/2, Screen.height/2, 100, 20), stringToEdit, 3);
		if (GUI.Button (Rect (Screen.width/2, Screen.height/2+60, 150, 100), "Enter")) {
			age = int.Parse(stringToEdit);
			PlayerPrefs.SetInt("age", age);
			startGUI = 3;
		}
	}
	else if (startGUI == 3) {
		GUI.Label(Rect(Screen.width/2, Screen.height/2-60, 150, 75), "How much do you weigh in kilograms?");
		weightToEdit = GUI.TextField (Rect (Screen.width/2, Screen.height/2, 100, 20), weightToEdit, 3);
		if (GUI.Button (Rect (Screen.width/2, Screen.height/2+60, 150, 100), "Enter")) {
			weight = float.Parse(weightToEdit);
			PlayerPrefs.SetFloat("weight", weight);
			defor.setWeight(weight); 
			startGUI = 4;
			PlayerPrefs.SetInt("startGUI", startGUI);
			calculateBMR(age, weight, gender);
		}
	}
	else if (showSummary == true) {
		var weeks : int = PlayerPrefs.GetInt("weeks");
		GUI.Label(Rect(Screen.width/2, Screen.height/2-100, 400, 75), "Energy consumed today: " + tempE + "kJs");
		GUI.Label(Rect(Screen.width/2, Screen.height/2-50, 400, 75), "You had " + (tempE * 7 * weeks) + " kJs over " + weeks + " weeks.");
		GUI.Label(Rect(Screen.width/2, Screen.height/2, 400, 75), "Fat consumed today: " + tempF + "g");
		GUI.Label(Rect(Screen.width/2, Screen.height/2+50, 400, 75), "You had " + (tempF * 7 * weeks) + " grams over " + weeks + " weeks.");
		GUI.Label(Rect(Screen.width/2, Screen.height/2+100, 400, 75), "Protein consumed today: " + tempP + "g");
		GUI.Label(Rect(Screen.width/2, Screen.height/2+150, 400, 75), "You had " + (tempP * 7 * weeks) + " grams over " + weeks + " weeks.");
		if (GUI.Button (Rect (Screen.width/2-128,
		 Screen.height-80, 256, 75), "Ok")) {
			showSummary = false;
		}
	}
	else {
	
		if (GUI.Button (Rect (Screen.width-300, 10, 256, 75), "Change settings")) {
			showSettings = true;
		}
		if (showSettings) {
			if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2-220, 256, 75), "Change gender")) {
				changeG = true;
				showSettings = false;
			}
			else if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2-130, 256, 75), "Change age")) {
				changeA = true;
				showSettings = false;
			}
			else if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2-40, 256, 75), "Change weight")) {
				changeW = true;
				showSettings = false;
			}
			else if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+50, 256, 75), "Set Time")) {
				setTime = true;
				showSettings = false;
			}
			else if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+140, 256, 75), "Back")) {
				showSettings = false;
			}
		}
		else if (changeG == true) {
			GUI.Label(Rect(Screen.width/2-125, Screen.height/2-80, 250, 75), "Are you male or female?");
			if (GUI.Button (Rect (Screen.width/2-256, Screen.height/2, 256, 75), "Male")) {
				gender = 1;
				PlayerPrefs.SetInt("gender", gender);
				changeG = false;
				showSettings = true;
				calculateBMR(age, weight, gender);
			}
			if (GUI.Button (Rect (Screen.width/2+20, Screen.height/2, 256, 75), "Female")) {
				gender = 0;
				PlayerPrefs.SetInt("gender", gender);
				changeG = false;
				showSettings = true;
				calculateBMR(age, weight, gender);
			}
		}
		else if (changeW == true) {
			GUI.Label(Rect(Screen.width/2-200, Screen.height/2-80, 400, 75), "How much do you weigh in kilograms?");
			weightToEdit = GUI.TextField (Rect (Screen.width/2-50, Screen.height/2, 100, 40), weightToEdit, 3);
			if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Enter")) {
				weight = float.Parse(weightToEdit);
				PlayerPrefs.SetFloat("weight", weight);
				defor.setWeight(weight);
				changeW = false;
				showSettings = true;
				calculateBMR(age, weight, gender);
			}
		}
		else if (changeA == true) {
			GUI.Label(Rect(Screen.width/2-150, Screen.height/2-80, 300, 75), "How old are you in years?");
			stringToEdit = GUI.TextField (Rect (Screen.width/2-50, Screen.height/2, 100, 40), stringToEdit, 3);
			if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Enter")) {
				age = int.Parse(stringToEdit);
				PlayerPrefs.SetInt("age", age);
				changeA = false;
				showSettings = true;
				calculateBMR(age, weight, gender);
			}
		}
		else if (setTime == true) {
			GUI.Label(Rect(Screen.width/2-150, Screen.height/2-80, 300, 75), "How many weeks should each day count for?");
			stringToEdit = GUI.TextField (Rect (Screen.width/2-50, Screen.height/2, 100, 40), stringToEdit, 3);
			if (GUI.Button (Rect (Screen.width/2-128, Screen.height/2+60, 256, 75), "Enter")) {
				PlayerPrefs.SetInt("weeks", int.Parse(stringToEdit));
				setTime = false;
				showSettings = true;
			}
		}
		

		GUI.Label(Rect(10, Screen.height-100, 400, 75), "Your current energy intake for today: " + totalEnergy + "kJ");
		GUI.Label(Rect(10, Screen.height-50, 400, 75), "Your current fat intake for today: " + totalFat + "g");
		GUI.Label(Rect(Screen.width-200, Screen.height-200, 200, 75), "Age: " + PlayerPrefs.GetInt("age"));
		GUI.Label(Rect(Screen.width-200, Screen.height-150, 200, 75), "Weight: " + PlayerPrefs.GetFloat("weight"));
		GUI.Label(Rect(Screen.width-200, Screen.height-100, 200, 75), "Gender: " + PlayerPrefs.GetInt("gender"));
		GUI.Label(Rect(Screen.width-200, Screen.height-50, 200, 75), "BMR: " + bmr);
		if (GUI.Button (Rect (10, 10, 256, 75), "Choose food for " + stateOfDay[stateIndex])) {	
			stateIndex++;
			if (stateIndex >= stateOfDay.length) {
				stateIndex = 0;
		//		var defor : deformMesh = gameObject.AddComponent(deformMesh);
				defor.deform(totalEnergy - bmr);
			}
			PlayerPrefs.SetInt("stateIndex", stateIndex);
			Application.LoadLevel ("Level2");
		}
	}
}

function calculateBMR(age : int, weight : int, gender : int) {
	if (gender == 1) {
		if (age < 10) {
			bmr = 95 * weight + 2110;
		}
		else if (age < 18) {
			bmr = 74 * weight + 2754;
		}
		else if (age < 30) {
			bmr = 63 * weight + 2896;
		}
		else if (age < 60) {
			bmr = 48 * weight + 3653;
		}
		else {
			bmr = 49 * weight + 2459;
		}
	}
	else {
		if (age < 10) {
			bmr = 85 * weight + 2033;
		}
		else if (age < 18) {
			bmr = 56 * weight + 2898;
		}
		else if (age < 30) {
			bmr = 62 * weight + 2036;
		}
		else if (age < 60) {
			bmr = 34 * weight + 3538;
		}
		else {
			bmr = 38 * weight + 2755;
		}
	}
	print(bmr);
}
