#pragma strict

var speed : float = 2;
var left : boolean = false;
var right : boolean = false;

function FixedUpdate () {

	if (left) {
		transform.position += Vector3.right * speed * Time.deltaTime;
	}
	else if (right) {
		transform.position += Vector3.left * speed * Time.deltaTime;
	}
}

function OnGUI() {

	if (GUI.RepeatButton (Rect (0, Screen.height/2, 150, 100), "")) {
		left = true;
	}
	else {
		left = false;
	}
	if (GUI.RepeatButton (Rect (Screen.width-100, Screen.height/2, 150, 100), "")) {
		right = true;
	} else {
		right = false;
	}
}