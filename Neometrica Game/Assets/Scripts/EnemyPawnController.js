#pragma strict

var health : int = 100;

var defaultMaterial : Material;
var hitMaterial : Material;

@script RequireComponent(AudioSource)
var destroyedSound : AudioClip;

function Start ()
{
	health = 100;
}

function Update () 
{
	if (health <= 0)
	{
		//Debug.Log("Enemy Pawn is destroyed");
		Destroy(gameObject);
		AudioSource.PlayClipAtPoint(destroyedSound, transform.position);
		//Debug.Log("Player Score is increased");
		GameObject.Find("FirstPersonController").GetComponent(PlayerController).score += 1;
	}
}

function OnCollisionEnter(other : Collision)
{
	//Debug.Log("Enemy Pawn collided with "+ other.gameObject.tag);
	
	if (other.gameObject.tag == "Player Bullet")
	{
		//Debug.Log("Enemy Pawn is hit by Player Bullet");
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = defaultMaterial;
	}
}