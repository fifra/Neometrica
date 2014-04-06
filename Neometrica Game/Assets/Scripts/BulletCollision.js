#pragma strict

@script RequireComponent(AudioSource)
var BulletCollisionSound : AudioClip;

function Start () 
{

}

function Update () 
{

}

//when the bullet collides with any tagged object, do the following...
function OnCollisionEnter(myCol : Collision)
{
	//display console message
	//tell which object the bullet is colliding with
	print ("Bullet collided with "+ myCol.gameObject.tag);
	
	//if the bullet collides with an enemy
	//kill the enemy
	
	if (myCol.gameObject.tag == "Enemy")
	{
		audio.PlayOneShot(BulletCollisionSound);
		Destroy(myCol.gameObject);
	}
}