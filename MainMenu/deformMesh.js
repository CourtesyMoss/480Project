#pragma strict

var a : float = 0.0015;
var b : float = 0.4953;
var c : float = 54.472;

public function deformMesh() {}

function Start() {
	a = 0.0015;
	b = 0.4953;
	c = 54.472;
	if (PlayerPrefs.HasKey("blendWeight")) {
		var blendWeight : float = PlayerPrefs.GetFloat("blendWeight");	
		var skinnedMeshRenderer : SkinnedMeshRenderer = this.GetComponentInChildren(SkinnedMeshRenderer);
		skinnedMeshRenderer.SetBlendShapeWeight(0, blendWeight);
	}
}

public function deform (difference : float) {
	print("deforming");
	//var obj : Transform = GameObject.Find("Cube");	
	var skinnedMeshRenderer : SkinnedMeshRenderer = this.GetComponentInChildren(SkinnedMeshRenderer);
	var weight : float = skinnedMeshRenderer.GetBlendShapeWeight(0);
	var weeks : int = PlayerPrefs.GetInt("weeks");
	if (weeks < 1) {
		weeks = 1;
	}
	var weightPrev : float = calcWeight(weight); // formula for this specific mesh
	var change : float = calcShapeKey((difference/4000 * weeks) + weightPrev);
	//change = change * 100;
	if (change > 100) {
		change = 100;
	}
	else if (change < 0) {
		change = 0;
	}
	print("change " + change);
	skinnedMeshRenderer.SetBlendShapeWeight(0, change); 
	PlayerPrefs.SetFloat("blendWeight", change);
	print("Previous weight " + weightPrev);
	print("Updated weight one week" + (weightPrev + (difference/4000)));
	print("Updated weight one year" + (weightPrev + (difference/4000 * weeks)));
	PlayerPrefs.SetFloat("weight", (weightPrev + (difference/4000 * weeks)));
	print("weight: " + weight);
	print("difference: " + difference);
}

public function setWeight (weight : float) {
	var change : float = calcShapeKey(weight);
	//change = change * 100;
	if (change > 100) {
		change = 100;
	}
	else if (change < 0) {
		change = 0;
	}
	var skinnedMeshRenderer : SkinnedMeshRenderer = this.GetComponentInChildren(SkinnedMeshRenderer);
	skinnedMeshRenderer.SetBlendShapeWeight(0, change);
	PlayerPrefs.SetFloat("blendWeight", change);
	print("set the weight to " + weight);
	print("shape key" + change);
}

public function calcWeight(shapeKey : float) {

	return Mathf.Pow(a * shapeKey, 2) + (b * shapeKey) + c;

}

public function calcShapeKey(weight : float) {
	if (weight < 54.5) {
		weight = 54.5;
		print("Changing weight");
	}
	return (-b + Mathf.Sqrt(Mathf.Pow(b, 2) - 4*a*(c - weight)))/(2*a);

}