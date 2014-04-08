#pragma strict

@script RequireComponent(AudioSource)

var itemCollectSound : AudioClip;

function Start () 
{

}

function Update () 
{

}

function OnControllerColliderHit (c : ControllerColliderHit)
{	
	print ("Player collided with " + c.gameObject.tag);
	
	if (c.gameObject.tag == "Health")
	{
		Destroy(c.gameObject);
		GameObject.Find("GuiMessage").GetComponent(DisplayMessage).displayText(c.gameObject.tag + " Restored!");
		audio.PlayOneShot(itemCollectSound);
		GameObject.Find("FirstPersonController").GetComponent(PlayerStats).playerHealth = 100;
		
	}
	
	if (c.gameObject.tag == "Ammo")
	{
		Destroy(c.gameObject);
		GameObject.Find("GuiMessage").GetComponent(DisplayMessage).displayText(c.gameObject.tag + " Refilled!");
		audio.PlayOneShot(itemCollectSound);
		GameObject.Find("FirstPersonController").GetComponent(PlayerStats).playerAmmo = 10;
	}
}