using UnityEngine;

public class Player : MonoBehaviour {
	// The force which is added when the player jumps
	// This can be changed in the Inspector window
	public Vector3 jumpForce = new Vector3(0, 300, 0);
	public bool dead = false;
	public bool disableJump = false;
	public int score = 0;
	public GUISkin customSkin;

	void Start() {
		Time.timeScale = 1;
		animation.wrapMode = WrapMode.Loop;
		animation.CrossFade("Flap", 0.2f);
		animation["Flap"].speed = 2.0f;
		InvokeRepeating("IncrementScore", 3f, 2f);
		if (PlayerPrefs.HasKey("blendWeight")) {
			float blendWeight = PlayerPrefs.GetFloat("blendWeight");	
			SkinnedMeshRenderer skinnedMeshRenderer = GetComponentInChildren<SkinnedMeshRenderer>();
			skinnedMeshRenderer.SetBlendShapeWeight(0, blendWeight);
			jumpForce = new Vector3(0, 300 - (2*Mathf.RoundToInt(blendWeight)), 0);
		}
	}
	
	// Update is called once per frame
	void Update ()
	{
		// Jump
		if ( Input.GetMouseButtonDown(0) && disableJump == false)
		{
			rigidbody.velocity = Vector3.zero;
			rigidbody.AddForce(jumpForce);
		}
		Vector2 screenPosition = Camera.main.WorldToScreenPoint(transform.position);
		if (screenPosition.y > Screen.height || screenPosition.y < 0)
		{
			disableJump = true;
			GameObject myLight = GameObject.FindWithTag( "light" );
			//disabling the Light
			myLight.light.enabled = false;
			animation.wrapMode = WrapMode.Once;
			animation.CrossFade("Head", 0.2f);
			Invoke ("Die", 2f);
		}
	}

	void OnCollisionEnter(Collision other)
	{
		disableJump = true;
		GameObject myLight = GameObject.FindWithTag( "light" );
		//disabling the Light
		myLight.light.enabled = false; 
		animation.wrapMode = WrapMode.Once;
		animation.CrossFade("Head", 0.2f);
		Invoke ("Die", 2f);
	}

	void OnGUI(){
		GUI.skin = customSkin;
		GUI.Label(new Rect(20, 20, 150, 75), "Score: " + score.ToString());
		if (dead) {
			if (!PlayerPrefs.HasKey("highScore")) {
				PlayerPrefs.SetInt("highScore", score);
			}
			int highScore = PlayerPrefs.GetInt("highScore");
			if (score >= highScore) {
				GUI.Label(new Rect(Screen.width/2-100, Screen.height/2-60, 250, 100), "New high score! : " + score.ToString());
				PlayerPrefs.SetInt ("highScore", score);
			}
			else {
				GUI.Label(new Rect(Screen.width/2-45, Screen.height/2-100, 150, 75), "Score: " + score.ToString());
				GUI.Label(new Rect(Screen.width/2-75, Screen.height/2-50, 150, 75), "High score: " + highScore.ToString());
			}
			if (GUI.Button (new Rect (Screen.width/2-100, Screen.height/2+25, 200, 100), "Play Again?")) {
				Application.LoadLevel(Application.loadedLevel);
			}
			else if (GUI.Button (new Rect (Screen.width/2-100, Screen.height/2+155, 200, 100), "Back")) {
				Application.LoadLevel("mainScene");
			}
		}
	}

	void IncrementScore() {
		score++;
	}

	void Die() {
		Time.timeScale = 0;
		dead = true;
	}
}