#pragma strict

var bullet : Rigidbody;
var speed = 10.0;

@script RequireComponent(AudioSource)
var bulletShootSound : AudioClip;


function Start () 
{
	Screen.showCursor = false;
}

function Update ()
{
	var hit : RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Vector3(Screen.width / 2, Screen.height / 2));
	
	if (Input.GetMouseButtonDown(0))
	{
		fireBullet();
		if (Physics.Raycast (ray, hit, 100))
		{
			print("You fired at " + hit.collider.gameObject.tag);
		}
	}
}

function fireBullet()
{
	var bulletClone : Rigidbody = Instantiate(bullet, transform.position, transform.rotation);
	bulletClone.velocity = transform.TransformDirection(Vector3(0, 0, speed));
	audio.PlayOneShot(bulletShootSound);
	Destroy (bulletClone.gameObject, 1);
}