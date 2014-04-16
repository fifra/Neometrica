#pragma strict

@script RequireComponent(AudioSource)
var hitSound : AudioClip;

var particlesPrefab : GameObject;

function Start () 
{
	Destroy(gameObject, 2.5f);
}

function Update () 
{

}

function OnCollisionEnter(other : Collision)
{
	//Debug.Log("Player Bullet collided with "+ other.gameObject.tag)
	
	var particlesInstance : GameObject;
	particlesInstance = Instantiate(particlesPrefab, transform.position, transform.rotation);
	Destroy(gameObject);
	//AudioSource.PlayClipAtPoint(hitSound, transform.position);
}