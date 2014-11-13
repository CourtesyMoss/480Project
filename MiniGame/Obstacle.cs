using UnityEngine;

public class Obstacle : MonoBehaviour
{
	public Vector3 velocity = new Vector3(-4, 0, 0);
	public float yPos = 0;
	
	// Use this for initialization
	void Start() {
		rigidbody.velocity = velocity;
		yPos = transform.position.y;
		//InvokeRepeating("move", 5f, 5f);
	}

	void Update() {
		Vector2 screenPosition = Camera.main.WorldToScreenPoint(transform.position);
		if (screenPosition.x < -2) {
			int offset = Mathf.RoundToInt(Random.Range(-3, 3)); // to make it less linear
			transform.position = new Vector3 (transform.position.x+40, transform.position.y, transform.position.z);
		}
	}

	void move() {
		transform.position = new Vector3 (transform.position.x+20, transform.position.y, transform.position.z);
	}
}