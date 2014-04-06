#pragma strict

@script RequireComponent(AudioSource)
var MedpackCollectSound : AudioClip;

function Start () 
{

}

function Update () 
{

}

//when the player collides with any tagged object, do the following...
function OnControllerColliderHit (c : ControllerColliderHit)
{	
	//display console message
	//tell which object the player is colliding with
	print ("Player collided with "+ c.gameObject.tag);
	
	//if the player collides with a medpack
	//make the medpack disappear
	if (c.gameObject.tag == "Medpack")
	{
		Destroy(c.gameObject);
		audio.clip = MedpackCollectSound;
		audio.Play();
	}
}