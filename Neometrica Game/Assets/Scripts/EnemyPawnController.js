#pragma strict

var health : int = 100;

var bulletPrefab : Rigidbody;
var cannon : Transform;
var isShooting : boolean = false;

var speed : float = 5.0;
private var Distance : float;
var target : Transform;
var followRange = 30.0;
var isFollowing : boolean = false;
private var damping = 6.0;

var defaultMaterial : Material;
var hitMaterial : Material;

@script RequireComponent(AudioSource)
var destroyedSound : AudioClip;
var explosion : GameObject;

function Start ()
{
	
}

function Update ()
{
	checkStats();
	transform.LookAt(target);
	checkDistance();
	actOnDistance();
}

function checkStats()
{
	if (health <= 0)
	{
		var explosionInstance : GameObject;
		explosionInstance = Instantiate(explosion, transform.position, transform.rotation);
		
		//Debug.Log("Enemy Pawn is destroyed");
		Destroy(gameObject);
		AudioSource.PlayClipAtPoint(destroyedSound, transform.position);
		//Debug.Log("Player Score is increased");
		GameObject.Find("Player").GetComponent(PlayerController).score += 5;
	}
}

function follow()
{
	var step = speed * Time.deltaTime;
	
	// Move our position a step closer to the target.
	transform.position = Vector3.MoveTowards(transform.position, target.position, step);
	
	//transform.Translate(Vector3.forward * followSpeed * Time.deltaTime);
}

function shootBullets()
{
	isShooting = true;
	while (isShooting == true)
	{
		var bulletInstance : Rigidbody;
		bulletInstance = Instantiate(bulletPrefab, cannon.position, cannon.rotation);
		bulletInstance.AddForce(cannon.forward * 5000);
		yield WaitForSeconds(2);
	}
}

function checkDistance()
{
	Distance = Vector3.Distance(target.position, transform.position);
	
	if (Distance < followRange)
	{
		isFollowing = true;
	}
	else
	{
		isFollowing = false;
	}
}

function actOnDistance()
{
	if (isFollowing == true)
	{
		//Debug.Log("Enemy is following Player");
		follow();
	}
}

function OnCollisionEnter(other : Collision)
{
	//Debug.Log("Enemy Pawn collided with "+ other.gameObject.tag);
	
	if (other.gameObject.tag == "Player Bullet")
	{
		//Debug.Log("Enemy Pawn is hit by Player Bullet");
		renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		renderer.sharedMaterial = defaultMaterial;
		health -= 50;
	}
	
	else if (other.gameObject.tag == "Player Missle")
	{
		//Debug.Log("Enemy Pawn is hit by Player Missle");
		renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		renderer.sharedMaterial = defaultMaterial;
		health -= 100;
	}
}