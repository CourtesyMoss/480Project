#pragma strict
import System.IO;

var fileName : String = "foodData.txt";
static var foodArray = new Array();
static var foodNames = new Array();

function Start () {

	var tempAsset: TextAsset = Resources.Load("foodData", TextAsset);
	var fileContents : String = tempAsset.text;

  //  var sr : StreamReader = new StreamReader(Application.dataPath + "/" + fileName);
   // var fileContents : String = sr.ReadToEnd();
  //  sr.Close();
 
 	var lines = new Array();
 	foodArray = new Array();
 	foodNames = new Array();
    lines = fileContents.Split("\n"[0]);
    var foodCategory : String = "Blank";
    var count : int = 0;
    for (var line : String in lines) {
        var separated = line.Split("\t"[0]);
        if (separated.length > 0 && separated.length < 3) {
        	foodCategory = separated[1];
        }
        else if (separated.length > 3) {
        	if (Regex.IsMatch(separated[1], "^[0-9]+")) {

        	}
        	else {
        		var newFood : FoodObject = new FoodObject(separated[0], separated[1], separated[2], separated[4], separated[6], separated[7], separated[10], separated[18], foodCategory);
        		foodArray.push(newFood);
        		foodNames.push(separated[1]);
        		count += 1;
        	}
        }
   }
   print("Total number of food objects: " + count);
}

static function search (searchValue : String) {
	var searchResults = new Array();
	var i : int;
	for (var foodName : String in FoodDatabase.foodNames) {
		if (foodName.ToLower().IndexOf(searchValue.ToLower()) > 0) {
	         searchResults.push(foodName);
	   	 }
	}
	return searchResults;
}

static function searchIndex (searchValue : String) {
	var index : int;
	var i : int;
	for(i = 0; i < FoodDatabase.foodNames.length; i++) {
		var item : String = FoodDatabase.foodNames[i];		
		if (searchValue == item) {
	         index = i;
	   	}
	}
	return index;
}


