#pragma strict

var health : int = 100;

var bulletPrefab : Rigidbody;
var cannon : Transform;
var isShooting : boolean = false;

private var Distance : float;
var Target : Transform;
var lookAtDistance = 60.0;
var isLooking : boolean = false;
var followRange = 40.0;
var isFollowing : boolean = false;
var moveSpeed = 5.0;
private var damping = 6.0;

var defaultMaterial : Material;
var hitMaterial : Material;

@script RequireComponent(AudioSource)
var hitSound : AudioClip;
var destroyedSound : AudioClip;

function Start ()
{

}

function Update ()
{
	checkStats();
	checkDistance();
	actOnDistance();
}

function checkStats()
{
	if (health <= 0)
	{
		//Debug.Log("Enemy Pawn is destroyed");
		Destroy(gameObject);
		//AudioSource.PlayClipAtPoint(destroyedSound, transform.position);
		//Debug.Log("Player Score is increased");
		GameObject.Find("Player").GetComponent(PlayerController).score += 1;
	}
}

function checkDistance()
{
	Distance = Vector3.Distance(Target.position, transform.position);
	
	if (Distance < lookAtDistance)
	{
		//Debug.Log("Enemy detected Player");
		isLooking = true;
	}
	else
	{
		//Debug.Log("Enemy is distant from Player");
		isLooking = false;
	}
	
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
	if (isLooking == true)
	{
		//Debug.Log("Enemy is looking at Player");
		lookAt();
	}
	
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
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = hitMaterial;
		yield WaitForSeconds(0.1);
		GameObject.Find("EnemyPawn").renderer.sharedMaterial = defaultMaterial;
		//AudioSource.PlayClipAtPoint(hitSound, transform.position);
		health -=50;
	}
}

function lookAt()
{
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
}

function follow()
{
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
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