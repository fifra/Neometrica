#pragma strict

var enemyPawnHealth : int = 100;
var enemyPawnMaterial : Material;
var enemyPawnHitMaterial : Material;

function Start ()
{
	enemyPawnHealth = 100;
}

function Update () 
{
	transform.Translate(Vector3.left * 4 * Time.deltaTime);
	
	if (enemyPawnHealth == 0)
	{
		Destroy(gameObject);
		GameObject.Find("FirstPersonController").GetComponent(PlayerController).playerScore += 1;
	}
}

function OnCollisionEnter(other : Collision)
{
	print ("Enemy pawn collided with "+ other.gameObject.tag);
	
	if (other.gameObject.tag == "Player")
	{
		GameObject.Find("FirstPersonController").GetComponent(PlayerController).playerHealth = 50;
	}
	
	if (other.gameObject.tag == "Bullet")
	{
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = enemyPawnHitMaterial;
		yield WaitForSeconds(0.2);
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = enemyPawnMaterial;
	}
}