#pragma strict

static var showFoods : boolean = false;
static var showSearch : boolean = false;
static var currentItemArr = new Array();

var selected : Transform;
 
 function Start() {
 	currentItemArr = new Array();
 }
 
//function Update() {
//  if (Input.GetMouseButtonDown(0)){ // if left button pressed...
//    // create a ray passing through the mouse pointer:
//    var ray = camera.ScreenPointToRay(Input.mousePosition);
//    var hit: RaycastHit;
//    if (Physics.Raycast(ray, hit)){ // if something hit...
//      // if you must do something with the previously
//      // selected item, do it here,
//      // then select the new one:
//      selected = hit.transform;
//      // do whatever you want with the newly selected
//      // object
//    }
//  }
//}

function OnMouseDown() {

	if (gameObject.name == "Other") {
		showSearch = true;
	}
	else {
		currentItemArr = new Array();
		showFoods = true;
		var i : int;
		for (var foodName : String in FoodDatabase.foodNames) {
			if (foodName.ToLower().IndexOf(gameObject.name.ToLower()) > 0) {
	         	currentItemArr.push(foodName);
	   		 }
		}
	}
//	for (i = 0; i < FoodDatabase.foodNames.length; i++) {
//		if (FoodDatabase.foodNames[i].IndexOf("Porridge") > 0) {
//         	print("yes, we do have porridge");
//   		 }
////		print(FoodDatabase.foodNames[i]);
////		print("I'm in the loop");
//	}
//	print(System.Array.IndexOf(FoodDatabase.foodNames, "Porridge"));

//	if (FoodDatabase.foodArray.Contains("Porridge")) {
	//	print("Yes.");
	//}
	//gameObject.name;
}