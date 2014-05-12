#pragma strict
@script RequireComponent(AudioSource)

var moveSpeed = 100;
var lifeTime : int = 2;

var hitEffect : GameObject;

var birthSound : AudioClip;
var hitSound : AudioClip;

function Start ()
{
	AudioSource.PlayClipAtPoint(birthSound, transform.position);
	Destroy(gameObject, lifeTime);
}

function Update ()
{
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
}

function OnTriggerEnter(other : Collider)
{
	//Debug.Log("Projectile collided with "+ other.gameObject.tag)
	Destroy(gameObject);
	
	var hitEffectInstance : GameObject;
	hitEffectInstance = Instantiate(hitEffect, transform.position, transform.rotation);
	
	AudioSource.PlayClipAtPoint(hitSound, transform.position);
}