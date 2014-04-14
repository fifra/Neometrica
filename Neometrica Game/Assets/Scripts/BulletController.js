#pragma strict

@script RequireComponent(AudioSource)
var enemyHitSound : AudioClip;

var sparksPrefab : GameObject;

function Start () 
{

}

function Update () 
{

}

function OnCollisionEnter(other : Collision)
{
	//Debug.Log("Player Bullet collided with "+ other.gameObject.tag);
	Destroy(gameObject);
	
	var sparksClone : GameObject = Instantiate(sparksPrefab, transform.position, transform.rotation);
	
	if (other.gameObject.tag == "Enemy Pawn")
	{
		AudioSource.PlayClipAtPoint(enemyHitSound, transform.position);
		GameObject.Find("EnemyPawn").GetComponent(EnemyPawnController).health -= 50;
	}
}