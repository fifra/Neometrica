#pragma strict

@script RequireComponent(AudioSource)
var hitSound : AudioClip;

var hitPrefab : GameObject;

function Start () 
{
	Destroy(gameObject, 1.5f);
}

function Update () 
{
	
}

function OnTriggerEnter(other : Collider)
{
	//Debug.Log("Bullet collided with "+ other.gameObject.tag)
	Destroy(gameObject);
	AudioSource.PlayClipAtPoint(hitSound, transform.position);
	
	var hitInstance : GameObject;
	hitInstance= Instantiate(hitPrefab, transform.position, transform.rotation);
}