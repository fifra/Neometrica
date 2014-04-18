#pragma strict

@script RequireComponent(AudioSource)
var hitSound : AudioClip;

var hitEffect : GameObject;

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
	Destroy(gameObject);
	AudioSource.PlayClipAtPoint(hitSound, transform.position);
	
	var hitEffectInstance : GameObject;
	hitEffectInstance = Instantiate(hitEffect, transform.position, transform.rotation);
}