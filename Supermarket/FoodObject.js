#pragma strict
	
public class FoodObject {
	
	var goodnessMod : int;
	var foodName : String;
	var foodID : String;
	var shortName : String;
	var measure : float;
	var energy : float;
	var protein : float;
	var fat : float;
	var sugar : float;
	var sodium : float;
	var foodCategory : String;
		
	function FoodObject(goodMod : int, nam : String) {
		this.goodnessMod = goodMod;
		this.foodName = nam;
	}
	
	function FoodObject(fooID : String, shortNam: String, meas : String, ener : String, prot : String, fa : String, sug : String, sod : String, categ : String) {
		this.foodID = fooID;
		this.shortName = shortNam;
		this.foodCategory = categ;
		
		if (meas == "trace") {
			meas = "-1";
		}
		if(ener == "trace") {
			ener = "-1";
		}
		if(prot == "trace") {
			prot = "-1";
		}
		if(fa == "trace") {
			fa = "-1";
		}
		if(sug == "trace") {
			sug = "-1";
		}
		if(sod == "trace") {
			sod = "-1";
		}
		this.measure = float.Parse(meas);
		this.energy = float.Parse(ener);
		this.protein = float.Parse(prot);
		this.fat = float.Parse(fa);
		this.sugar = float.Parse(sug);
		this.sodium = float.Parse(sod);
		
	}
}