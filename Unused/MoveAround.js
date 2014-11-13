#pragma strict

//var speed : float = 3.0;
var rotateSpeed : float = 3.0;
var moveJoystick : Joystick;
var rotateJoystick : Joystick;
var eulerAngleVelocity : Vector3 = Vector3 (0, 0, 100);
var eulerAngleVelocityNeg : Vector3 = Vector3 (0, 0, -100);
var force : float = 8.0;
animation["walk"].speed = 3;

private var speed : Vector3 = Vector3 (3, 0, 0);



function FixedUpdate () {
	var rigidbody : Rigidbody = GetComponent(Rigidbody);
	var x : float = getJoystickX(moveJoystick);
	var y : float = getJoystickY(moveJoystick);
	var relative : Vector3;
	
	if (x != 0 && y != 0) {
	    var playerAngle : float = Mathf.Deg2Rad * (360 - rigidbody.transform.eulerAngles.y);
       	var x2 : float = (x * Mathf.Cos(playerAngle)) - (y *  Mathf.Sin(playerAngle));
       	var z2 : float = (x * Mathf.Sin(playerAngle)) + (y *  Mathf.Cos(playerAngle));
		var vector = Vector3(x2, 0, z2);
		relative = rigidbody.transform.TransformDirection(vector);
		rigidbody.AddForce (vector * force);
		animation.CrossFade("walk", 0.2);
	}

	var a : float = getJoystickX(rotateJoystick);
	var b : float = getJoystickY(rotateJoystick);
	var angle : float = Mathf.Atan2(a, b) * 180/Mathf.PI;
	//print(angle);
	if (a != 0 && b != 0) {
		rigidbody.AddTorque (0, angle/10, 0);
		//rigidbody.MoveRotation (Quaternion.Euler (270, angle, 0));
	}
//	if (joyStickInput(moveJoystick) > 0) {
//		rigidbody.MovePosition(rigidbody.position + speed * Time.deltaTime);
//	}
//	// Rotate around y - axis
//	if (joyStickInput(rotateJoystick) > 0) {
// 	var deltaRotation : Quaternion = Quaternion.Euler(eulerAngleVelocity * Time.deltaTime);
//	rigidbody.MoveRotation(rigidbody.rotation * deltaRotation);
//	}
//	if (joyStickInput(rotateJoystick) < 0) {
// 	var deltaRotationNeg : Quaternion = Quaternion.Euler(eulerAngleVelocityNeg * Time.deltaTime);
//	rigidbody.MoveRotation(rigidbody.rotation * deltaRotationNeg);
//	}
}

//function FixedUpdate () {
//
//    var rigidbody : Rigidbody = GetComponent(Rigidbody);
// 
//    // Rotate around y - axis
//   // var rotatePos = Input.GetAxis ("Horizontal") ? 
//   //                    Input.GetAxis ("Horizontal") : joyStickInput(rotateJoystick);
//   // transform.Rotate(0, rotatePos * rotateSpeed, 0);
// 
//    // Move forward / backward
//    
//  //  var forward = transform.TransformDirection(Vector3.forward);
//    var movePos = Input.GetAxis ("Vertical") ? 
//                     Input.GetAxis ("Vertical") : joyStickInput(moveJoystick);
//    var curSpeed = speed * movePos;
//    rigidbody.AddRelativeForce(Vector3.forward * curSpeed);
//}
// 
function joyStickInput (joystick : Joystick) {
    var absJoyPos = Vector2 (Mathf.Abs(joystick.position.x),
                                   Mathf.Abs(joystick.position.y));
    var xDirection = (joystick.position.x > 0) ? 1 : -1;
    var yDirection = (joystick.position.y > 0) ? 1 : -1;
    return ( ( absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}

function getJoystickX (joystick: Joystick) {
	return joystick.position.x;
}

function getJoystickY (joystick: Joystick) {
	return joystick.position.y;
}
 
@script RequireComponent(Rigidbody)