#pragma strict

@script RequireComponent(AudioSource)
var BulletShootSound : AudioClip;

var Bullet : Rigidbody;
var Speed = 20;

function Update () {
	if (Input.GetMouseButtonDown(0))
	{
		var clone = Instantiate(Bullet, transform.position, transform.rotation);
		clone.velocity = transform.TransformDirection(Vector3(0, 10, Speed));
		
		audio.PlayOneShot(BulletShootSound);
		Destroy (clone.gameObject, 5);
	}
}