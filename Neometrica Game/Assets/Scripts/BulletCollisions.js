#pragma strict

@script RequireComponent(AudioSource)
var enemyHitSound : AudioClip;

function Start () 
{

}

function Update () 
{

}

function OnCollisionEnter(bulletCollision : Collision)
{
	print ("Bullet collided with "+ bulletCollision.gameObject.tag);
	
	if (bulletCollision.gameObject.tag == "Enemy")
	{
		audio.PlayOneShot(enemyHitSound);
		Destroy(bulletCollision.gameObject, 3);
	}
}