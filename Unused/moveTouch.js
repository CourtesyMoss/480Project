#pragma strict

var force : float = 10.0;

function OnMouseDown () {
		var rigidbody : Rigidbody = GetComponent(Rigidbody);
		rigidbody.AddForce (transform.forward * force);
}