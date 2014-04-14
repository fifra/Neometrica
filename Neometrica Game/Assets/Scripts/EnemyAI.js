var Distance;
var Target : Transform;
var lookAtDistance = 60.0;
var attackRange = 40.0;
var moveSpeed = 5.0;
var damping = 6.0;

function Start ()
{

}

function Update ()
{
	Distance = Vector3.Distance(Target.position, transform.position);
	
	if (Distance < lookAtDistance)
	{
		Debug.Log("Enemy detected player");
		lookAt();
	}
	
	if (Distance > lookAtDistance)
	{
		Debug.Log("Player is distant from enemy");
	}
	
	if (Distance < attackRange)
	{
		Debug.Log("Player is very close to enemy");
		renderer.material.color = Color.red;
		attack ();
	}
}

function lookAt ()
{
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
}

function attack ()
{
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
}