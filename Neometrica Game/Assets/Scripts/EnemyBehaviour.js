#pragma strict
@script RequireComponent(AudioSource)

var isPawn : boolean = false;
var isKing : boolean = false;
var isKingWing : boolean = false;

var hasHealth : boolean = true;
var health : int = 50;

var canLook : boolean = true;

var canFollow : boolean = true;
var moveSpeed : int = 5;

var target : Transform;

private var distance : float;
var attackRange = 100.0;
private var damping = 6.0;

var canShoot : boolean = true;
var bullet : Rigidbody;
var cannon : Transform;

var shootInterval = 4;
private var timestamp = 0.0;

var materials : Material[];

var deathEffect : GameObject;

var deathSound : AudioClip;

function Start ()
{
	CheckRank();
	ModifyRank();
	
	target = GameObject.FindWithTag("Player").transform;
}

function Update ()
{
	CheckHealth();
	
	distance = Vector3.Distance(target.position, transform.position);
	
	if (distance < attackRange)
	{
		Look();
		Follow();
		Shoot();
	}
	else
	{
		Look();
	}
	
	if (isKing)
	{
		CheckKingWings();
	}
}

function CheckHealth()
{
	if (health <= 0)
	{
		//Debug.Log("Enemy is destroyed");
		health = 0;
		Explode();
		
		Destroy(gameObject);
	}
}

function CheckRank()
{
	if (this.gameObject.tag == "Enemy Pawn")
	{
		isPawn = true;
	}
	else
	{
		isPawn = false;
	}	
	
	if (this.gameObject.tag =="Enemy King")
	{
		isKing = true;
	}
	else
	{
		isKing = false;
	}	
	
	if (this.gameObject.tag == "Enemy King Wing")
	{
		isKingWing = true;
	}
	else
	{
		isKingWing = false;
	}
}

function ModifyRank()
{
	if (isPawn)
	{
		health += 50;
		moveSpeed += 8;
	}
	
	if (isKing)
	{
		health += 450;
		moveSpeed -= 2;
		hasHealth = false;
		canFollow = false;
	}
	
	if (isKingWing)
	{
		health += 200;
		moveSpeed -= 2;
	}
}

function CheckKingWings()
{
	if (GameObject.FindGameObjectWithTag("Enemy King Wing") == null)
	{
		GameObject.FindGameObjectWithTag("Enemy King").GetComponent(EnemyBehaviour).hasHealth = true;
	}
}

function Look()
{
	if (canLook)
	{
		transform.LookAt(target);
	}
}	

function Follow()
{
	if (canFollow)
	{
		var step = moveSpeed * Time.deltaTime;
		transform.position = Vector3.MoveTowards(transform.position, target.position, step);
	}
}

function Shoot()
{
	if (canShoot)
	{
		if (Time.time > timestamp)
		{
			var bulletInstance : Rigidbody;
			bulletInstance = Instantiate(bullet, cannon.position, cannon.rotation);
			timestamp = Time.time + shootInterval;
		}
	}
}

function Explode()
{

	var explosionInstance : GameObject;
	
	if (isKingWing)
	{
		if (this.gameObject.name == "WingLeft")
		{
			explosionInstance = Instantiate(deathEffect, Vector3(transform.position.x *10.0, transform.position.y, transform.position.z), transform.rotation);
		}
		else if (this.gameObject.name == "WingRight"){
		explosionInstance = Instantiate(deathEffect, Vector3(transform.position.x *-10.0, transform.position.y, transform.position.z), transform.rotation);
		}
	}
	else
	{
		explosionInstance = Instantiate(deathEffect, transform.position, transform.rotation);
	}
	
	AudioSource.PlayClipAtPoint(deathSound, transform.position);
}

function Flash()
{
	if (materials.Length == 0) // do nothing if no materials
	return;
	renderer.sharedMaterial = materials[1];
	yield WaitForSeconds(0.1);
	renderer.sharedMaterial = materials[0];
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player Bullet")
	{
		//Debug.Log("Enemy hit by Player Bullet");
		Flash();
		if (hasHealth)
		{
			health -= 50;
		}
	}
	
	else if (other.gameObject.tag == "Player Missle")
	{
		//Debug.Log("Enemy hit by Player Missle");
		Flash();
		if (hasHealth)
		{
			health -= 100;
		}
	}
	
	else if (other.gameObject.tag == "Player")
	{
		//Debug.Log("Enemy crashed into Player");
		if (hasHealth)
		{
			health -= 100;
		}
	}
	
	else if (other.gameObject.tag == "Player Shockwave")
	{
		//Debug.Log("Enemy hit by Player Shockwave");
		if (hasHealth)
		{
			health -= 100;
		}
	}
}