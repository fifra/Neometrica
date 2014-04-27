#pragma strict

var health : int = 100;
var ammo : int = 20;
var score : int = 0;

var moveSpeed : float = 10;
var rotateSpeed : float = 100;

var explosionPrefab : GameObject;

@script RequireComponent(AudioSource)
var collectSound : AudioClip;
var hitSound : AudioClip;
var destroyedSound : AudioClip;
var motorSound : AudioClip;

function Start ()
{
	moveSpeed *= Time.deltaTime;
	rotateSpeed *= Time.deltaTime;
}

function Update () 
{
	showStats();
	checkStats();
	playerMovement();
}

function showStats()
{
	GameObject.Find("GuiHealth").guiText.text = "Health: " + health.ToString();
	GameObject.Find("GuiAmmo").guiText.text = "Ammo: " + ammo.ToString();
	GameObject.Find("GuiScore").guiText.text = "Score: " + score.ToString();
}

function checkStats()
{
	if (health <= 0)
	{
		//explode();
		
		GameObject.Find("Robot").renderer.enabled = false;
		GameObject.Find("Head").renderer.enabled = false;
		GameObject.Find("Arm").renderer.enabled = false;
		
		yield WaitForSeconds(2);
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are destroyed!");
		yield WaitForSeconds(2);
		
		Application.LoadLevel(2);
	}
	
	if (ammo <= 0)
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
}

function explode()
{
	var explosionInstance : GameObject;
	explosionInstance = Instantiate(explosionPrefab, transform.position, transform.rotation);
	AudioSource.PlayClipAtPoint(destroyedSound, new Vector3(5,1,2));
}

function playerMovement()
{
	var translation : float = Input.GetAxis("Vertical") * moveSpeed;
	var rotation : float = Input.GetAxis("Horizontal") * rotateSpeed;
	
	translation *= Time.deltaTime;
	rotation *= Time.deltaTime;
	
	if (Input.GetAxis("Vertical"))
	{
		transform.Translate(0, 0, translation);
		//AudioSource.PlayClipAtPoint(motorSound, transform.position);
	}
	
	if (Input.GetAxis("Horizontal"))
	{
		transform.Rotate(0, rotation, 0);
		//AudioSource.PlayClipAtPoint(motorSound, transform.position);
	}
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Health")
	{
		//Debug.Log("Player collected Health");
		Destroy(other.gameObject);
		health = 100;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Restored!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Ammo")
	{
		//Debug.Log("Player collected Ammo");
		Destroy(other.gameObject);
		ammo = 20;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Refilled!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Score")
	{
		//Debug.Log("Player collected Score");
		Destroy(other.gameObject);
		score += 10;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Boosted!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Enemy Bullet")
	{
		//Debug.Log("Player hit by Enemy Bullet");
		health -= 10;
	}
	
	else if (other.gameObject.tag == "Enemy Pawn")
	{
		//Debug.Log("Player crashed into Enemy Pawn");
		health = 0;
	}
}

/*
function OnControllerColliderHit(c : ControllerColliderHit)
{	
	Debug.Log("Player collided with " + c.gameObject.tag);
	

}
*/