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
	print ("Bullet collided with "+ other.gameObject.tag);
	Destroy(gameObject);
	
	var sparksClone : GameObject = Instantiate(sparksPrefab, transform.position, transform.rotation);
	
	if (other.gameObject.tag == "EnemyPawn")
	{
		AudioSource.PlayClipAtPoint(enemyHitSound, transform.position);
		GameObject.Find("EnemyPawn").GetComponent(EnemyPawnController).enemyPawnHealth -= 50;
	}
}