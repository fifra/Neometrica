#pragma strict

var health : int = 100;
var ammo : int = 20;
var score : int = 0;

@script RequireComponent(AudioSource)
var itemCollectSound : AudioClip;

function Start ()
{
	health = 100;
	ammo = 10;
	score = 0;
}

function Update () 
{
	if (health <= 0)
	{
		//Debug.Log("Player is destroyed");
	}
	
	GameObject.Find("GuiHealth").guiText.text = "Health: " + health.ToString();
	GameObject.Find("GuiAmmo").guiText.text = "Ammo: " + ammo.ToString();
	GameObject.Find("GuiScore").guiText.text = "Score: " + score.ToString();
}

function OnControllerColliderHit(c : ControllerColliderHit)
{	
	//Debug.Log("Player collided with " + c.gameObject.tag);
	
	if (c.gameObject.tag == "Health")
	{
		//Debug.Log("Player collected Health");
		Destroy(c.gameObject);
		health = 100;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Restored!");
		AudioSource.PlayClipAtPoint(itemCollectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Ammo")
	{
		//Debug.Log("Player collected Ammo");
		Destroy(c.gameObject);
		ammo = 10;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Refilled!");
		AudioSource.PlayClipAtPoint(itemCollectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Enemy Pawn")
	{
		//Debug.Log("Player crashed into Enemy Pawn");
		health -= 50;
	}
}