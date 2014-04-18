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
	//Debug.Log("Player Missle collided with "+ other.gameObject.tag)
	
	var hitEffectInstance : GameObject;
	hitEffectInstance = Instantiate(hitEffect, transform.position, transform.rotation);
	
	Destroy(gameObject);
	AudioSource.PlayClipAtPoint(hitSound, transform.position);
}