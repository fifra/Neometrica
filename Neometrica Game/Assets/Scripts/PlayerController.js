#pragma strict

var health : int = 100;
var ammo : int = 20;
var score : int = 0;

@script RequireComponent(AudioSource)
var collectSound : AudioClip;
var hitSound : AudioClip;

function Start ()
{
	
}

function Update () 
{
	showStats();
	checkStats();
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
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are dead!");
		yield WaitForSeconds(0.4);
		Application.LoadLevel(2);
	}
	
	if (ammo <= 0)
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
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
		//AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Ammo")
	{
		//Debug.Log("Player collected Ammo");
		Destroy(c.gameObject);
		ammo = 20;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Refilled!");
		//AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Score")
	{
		//Debug.Log("Player collected Score");
		Destroy(c.gameObject);
		score += 10;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(c.gameObject.tag + " Boosted!");
		//AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (c.gameObject.tag == "Enemy Pawn")
	{
		//Debug.Log("Player crashed into Enemy Pawn");
		health = 0;
	}
}