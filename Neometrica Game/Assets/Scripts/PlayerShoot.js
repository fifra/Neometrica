#pragma strict

@script RequireComponent(AudioSource)
var bulletShootSound : AudioClip;

var bullet : Rigidbody;
var bulletSpeed : int;

var missle : Rigidbody;
var missleSpeed : int;

var weaponEquipped : int;

function Start () 
{
	Screen.showCursor = false;
	
	bulletSpeed = 60;
	missleSpeed = 30;
	weaponEquipped = 1;
}

function Update ()
{
	if (Input.GetKeyDown("left alt"))
	{
		//Debug.Log("Alt key is pressed");
		switch(weaponEquipped)
		{
			case 0:
			weaponEquipped = 1;
			Debug.Log("Weapon equipped is Bullet");
			break;
			
			case 1:
			weaponEquipped = 0;
			Debug.Log("Weapon equipped is Missle");
			break;
		}
	}
	
	if (Input.GetMouseButtonDown(0))
	{
		//Debug.Log("Mouse button is clicked");
		switch(weaponEquipped)
		{
			case 0:
			shootMissle ();
			break;
			
			case 1:
			shootBullet ();
			break;
		}
	}
}

function shootBullet()
{
	//Debug.Log("Player shot Bullet");
	if (GameObject.Find("FirstPersonController").GetComponent(PlayerController).ammo >= 1)
	{
		var bulletClone : Rigidbody = Instantiate(bullet, transform.position + transform.forward * 2.0, transform.rotation);
		bulletClone.velocity = transform.TransformDirection(Vector3(0, 0, bulletSpeed));
		Destroy(bulletClone.gameObject, 1);
		GameObject.Find("FirstPersonController").GetComponent(PlayerController).ammo --;
		AudioSource.PlayClipAtPoint(bulletShootSound, transform.position);
	}
	else
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
}

function shootMissle()
{
	//Debug.Log("Player shot missle");
	if (GameObject.Find("FirstPersonController").GetComponent(PlayerController).ammo >= 1)
	{
		var missleClone : Rigidbody = Instantiate(missle, transform.position + transform.forward * 2.0, transform.rotation);
		missleClone.velocity = transform.TransformDirection(Vector3(0, 0, missleSpeed));
		Destroy(missleClone.gameObject, 1);
		GameObject.Find("FirstPersonController").GetComponent(PlayerController).ammo -= 5;
		AudioSource.PlayClipAtPoint(bulletShootSound, transform.position);
	}
	else
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
}
