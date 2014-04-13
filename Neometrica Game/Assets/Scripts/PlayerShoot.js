#pragma strict

@script RequireComponent(AudioSource)
var bulletShootSound : AudioClip;

var bulletPrefab : Rigidbody;
var bulletSpeed : int;

function Start () 
{
	Screen.showCursor = false;
	bulletSpeed = 60;
}

function Update ()
{
	var hit : RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Vector3(Screen.width / 2, Screen.height / 2));
	
	if (Input.GetMouseButtonDown(0))
	{
		if (GameObject.Find("FirstPersonController").GetComponent(PlayerController).playerAmmo >= 1)
		{
			fireBullet();
			if (Physics.Raycast (ray, hit, 100))
			{
				print("You fired at " + hit.collider.gameObject.tag);
			}
		}
		else
		{
			print("You are out of ammo");
		}
	}
}

function fireBullet()
{
	var bulletClone : Rigidbody = Instantiate(bulletPrefab, transform.position + transform.forward * 2.0, transform.rotation);
	bulletClone.velocity = transform.TransformDirection(Vector3(0, 0, bulletSpeed));
	Destroy (bulletClone.gameObject, 1);
	GameObject.Find("FirstPersonController").GetComponent(PlayerController).playerAmmo --;
	AudioSource.PlayClipAtPoint(bulletShootSound, transform.position);
}
