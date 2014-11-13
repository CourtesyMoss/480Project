#pragma strict

var goodText : String = "Eat";
var badText : String = "Don't Eat";
var stateOfDay : int = 0;
var stateOfDayLabel = "Breakfast";
var stateArray  = new Array();
var breakfastOptions = new Array();
var lunchOptions = new Array();
var dinnerOptions = new Array();
var foodArr = new Array();
foodArr = FoodDatabase.foodArray;
var dayCount : int = 1;
var drawSubmenu : boolean = false;
stateArray.push("Breakfast");
stateArray.push("Lunch");
stateArray.push("Dinner");

var stringToEdit : String = "";
var weightToEdit : String = "";

static var gender : int;
static var age : int;
static var weight : int;
static var startGUI : int = 1;

static var bmr : int;

function Start() {

	initialiseFood();

	if(PlayerPrefs.HasKey("startGUI")){
	   // there is a saved level, load that one
	   startGUI = PlayerPrefs.GetInt("startGUI");
	   gender = PlayerPrefs.GetInt("gender");
	   age = PlayerPrefs.GetInt("age");
	   weight = PlayerPrefs.GetInt("weight");
	}
	if (startGUI != 1) {
		calculateBMR(age, weight, gender);
	}
}

static var goodness : float = 20.0;


function OnGUI () {
//	if (animation.IsPlaying("Eat")) {
//		GUI.enabled = false;
//		print ("Disabling GUI");
//	}
//	else {
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
			weight = int.Parse(weightToEdit);
			PlayerPrefs.SetInt("weight", weight);
			startGUI = 4;
			PlayerPrefs.SetInt("startGUI", startGUI);
			calculateBMR(age, weight, gender);
		}
	}
	else {
		if (drawSubmenu == false) {
			GUI.enabled = true;
			var foo : FoodObject = foodArr[199];
			//print(foo.sugar);
			if (GUI.Button (Rect (10,50,150,100), goodText)) {
				//OptionsGUI();
				drawSubmenu = true;
				animation.CrossFade("Eat", 0.2);
	//			if (goodness < 100) {
	//				goodness = goodness + 2.0;
	//			}
				stateOfDay += 1;
			}
			if (GUI.Button (Rect (10,160,150,100), badText)) {
				animation.CrossFade("Idle", 0.2);
				if (goodness > 0) {
					goodness = goodness - 2.0;
				}
				stateOfDay += 1;
			}
			GUI.Label(Rect(10, 260, 100, 75), goodness.ToString());
			GUI.Label(Rect(10, 10, 100, 75), stateOfDayLabel);
			if (stateOfDay > stateArray.length-1) {
				stateOfDay = 0;
				dayCount++;
			}
			GUI.Label(Rect(10, 280, 100, 75), dayCount.ToString());
			stateOfDayLabel = stateArray[stateOfDay];
		}
		else if (drawSubmenu == true) {
			var porridge : FoodObject = new FoodObject(2, "Porridge");
			var options : Array = new Array();
			var stateIndex : int = stateArray.length-1;
			if (stateOfDay > 0) {
				stateIndex = stateOfDay-1;
			}
			if (stateArray[stateIndex] == "Breakfast") {
				options = breakfastOptions;
			}
			else if (stateArray[stateIndex] == "Lunch") {
				options = lunchOptions;
			}
			else if (stateArray[stateIndex] == "Dinner") {
				options = dinnerOptions;
			}
		//	if (stateArray[stateOfDay] == "Breakfast") {
				var offset : int = 10;
				var i : int;
				for(i = 0; i < options.length; i++) {
					var food : FoodObject = options[i];
					if (GUI.Button (Rect (Screen.width-200, offset, 150, 100), food.foodName)) {
						if (goodness < 100 && goodness > 0) {
							goodness += food.goodnessMod;
						}
						drawSubmenu = false;
					}
					offset += 110;
				}
		//	}
		}
	}
}

function initialiseFood() {

	var porridge : FoodObject = new FoodObject(2, "Porridge");
	var cereal : FoodObject = new FoodObject(1, "Cereal");
	var iceCream : FoodObject = new FoodObject(-3, "Ice-cream");
	var sandwich : FoodObject = new FoodObject(1, "Sandwich");
	var cake : FoodObject = new FoodObject(-2, "Cake");
	var sausages : FoodObject = new FoodObject(-1, "Sausages");

	breakfastOptions.push(porridge);
	breakfastOptions.push(cereal);
	breakfastOptions.push(iceCream);

	lunchOptions.push(sandwich);
	lunchOptions.push(cake);
	lunchOptions.push(iceCream);

	dinnerOptions.push(sausages);
	dinnerOptions.push(iceCream);

}

function OptionsGUI() {
	var porridge : FoodObject = new FoodObject(2, "Porridge");
	
	if (stateArray[stateOfDay] == "Breakfast") {
		var offset : int = 10;
		var i : int;
		for(i = 0; i < breakfastOptions.length; i++) {
			var food : FoodObject = breakfastOptions[i];
			if (GUI.Button (Rect (Screen.width-60, offset, 150, 100), "Hello")) {
				offset += 50;
				if (goodness < 100 && goodness > 0) {
					goodness += porridge.goodnessMod;
				}
			}
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
