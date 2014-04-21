#pragma strict

var health : int = 100;

var bulletPrefab : Rigidbody;
var cannon : Transform;

var moveSpeed : float = 6.0;
var shootSpeed : int = 80;
private var distance : float;
var target : Transform;
var attackRange = 30.0;
private var damping = 6.0;

var timeBetweenShots = 4;
private var timestamp = 0.0;

var defaultMaterial : Material;
var hitMaterial : Material;

@script RequireComponent(AudioSource)
var destroyedSound : AudioClip;
var explosionPrefab : GameObject;

function Start ()
{
	target = GameObject.FindWithTag("Player").transform;
}

function Update ()
{
	checkStats();
	
	transform.LookAt(target);
	
	distance = Vector3.Distance(target.position, transform.position);
	
	if (distance < attackRange)
	{
		follow();
		shoot();
	}
}

function checkStats()
{
	if (health <= 0)
	{
		var explosionInstance : GameObject;
		explosionInstance = Instantiate(explosionPrefab, transform.position, transform.rotation);
		
		//Debug.Log("Enemy Pawn is destroyed");
		Destroy(gameObject);
		AudioSource.PlayClipAtPoint(destroyedSound, transform.position);
		//Debug.Log("Player Score is increased");
		GameObject.Find("Player").GetComponent(PlayerController).score += 5;
	}
}

function follow()
{
	var step = moveSpeed * Time.deltaTime;
	transform.position = Vector3.MoveTowards(transform.position, target.position, step);
}

function shoot()
{
	if (Time.time > timestamp)
	{
	var bulletInstance : Rigidbody;
	bulletInstance = Instantiate(bulletPrefab, cannon.position, cannon.rotation);
	bulletInstance.velocity = transform.TransformDirection(Vector3.forward * shootSpeed);
	timestamp = Time.time + timeBetweenShots;
	}
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player Bullet")
	{
		//Debug.Log("Enemy Pawn hit by Player Bullet");
		renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		renderer.sharedMaterial = defaultMaterial;
		health -= 50;
	}
	
	else if (other.gameObject.tag == "Player Missle")
	{
		//Debug.Log("Enemy Pawn hit by Player Missle");
		renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		renderer.sharedMaterial = defaultMaterial;
		health -= 100;
	}
	
	else if (other.gameObject.tag == "Player")
	{
		//Debug.Log("Enemy Pawn crashed into Player");
		health -= 100;
	}
}