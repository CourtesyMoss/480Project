#pragma strict

var playAnim : boolean = true;
var animSpeed : int = 0.4;

function Start () {
	animation["Breathing"].speed = .38;
	animation["LeanBack"].speed = 0.5;
	animation["HandsOverHead"].speed = 0.5;
	animation.wrapMode = WrapMode.Loop;
	animation.CrossFade("Breathing", 0.2);
}

function Update () {
	if (playAnim) {
		PlayAnimation();
	}
}

function PlayAnimation() {
	playAnim = false;
	yield WaitForSeconds(5);
	if (Random.Range(0, 100) > 80) {
		animation.wrapMode = WrapMode.Once;
		var chance : float = Random.Range(0, 100);
		if (chance > 50) {
			animation.CrossFade("LeanBack", 0.3);
			yield WaitForSeconds(animation["LeanBack"].length / 0.5);
		}
		else {
			animation.CrossFade("HandsOverHead", 0.3);
			yield WaitForSeconds(animation["HandsOverHead"].length / 0.5);
		}
		animation.CrossFade("Breathing", 0.2);
		animation.wrapMode = WrapMode.Loop;
		
	}
	playAnim = true;
}