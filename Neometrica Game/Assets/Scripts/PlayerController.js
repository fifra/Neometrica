#pragma strict

var playerHealth : int = 100;
var playerAmmo : int = 20;
var playerScore : int = 0;

@script RequireComponent(AudioSource)
var itemCollectSound : AudioClip;

function Start ()
{
	playerHealth = 100;
	playerAmmo = 10;
	playerScore = 0;
}

function Update () 
{
	GameObject.Find("GuiHealth").guiText.text = "Health: " + playerHealth.ToString();
	GameObject.Find("GuiAmmo").guiText.text = "Ammo: " + playerAmmo.ToString();
	GameObject.Find("GuiScore").guiText.text = "Score: " + playerScore.ToString();
}

function OnControllerColliderHit(c : ControllerColliderHit)
{	
	print ("Player collided with " + c.gameObject.tag);
	
	if (c.gameObject.tag == "Health")
	{
		Destroy(c.gameObject);
		playerHealth = 100;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Restored!");
		AudioSource.PlayClipAtPoint(itemCollectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Ammo")
	{
		Destroy(c.gameObject);
		playerAmmo = 10;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Refilled!");
		AudioSource.PlayClipAtPoint(itemCollectSound, transform.position);
	}
}