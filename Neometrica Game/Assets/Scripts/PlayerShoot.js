#pragma strict

var weaponEquipped : int = 1;

var cannon : Transform;

var bulletPrefab : Rigidbody;

var misslePrefab : Rigidbody;

@script RequireComponent(AudioSource)
var shootSound : AudioClip;

function Start () 
{
	Screen.showCursor = false;
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
			Debug.Log("Player changed weapon to Bullet");
			break;
			
			case 1:
			weaponEquipped = 0;
			Debug.Log("Player changed weapon to Missle");
			break;
		}
	}
	
	if (Input.GetButtonDown("Fire1"))
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
	if (GameObject.Find("Player").GetComponent(PlayerController).ammo >= 1)
	{
		var bulletInstance : Rigidbody;
		bulletInstance = Instantiate(bulletPrefab, cannon.position, cannon.rotation);
		bulletInstance.AddForce(cannon.forward * 5000);
		GameObject.Find("Player").GetComponent(PlayerController).ammo --;
		//AudioSource.PlayClipAtPoint(shootSound, transform.position);
	}
}

function shootMissle()
{
	//Debug.Log("Player shot Missle");
	if (GameObject.Find("Player").GetComponent(PlayerController).ammo >= 1)
	{
		var missleInstance : Rigidbody;
		missleInstance = Instantiate(misslePrefab, cannon.position, cannon.rotation);
		missleInstance.AddForce(cannon.forward * 2500);
		GameObject.Find("Player").GetComponent(PlayerController).ammo -= 5;
		//AudioSource.PlayClipAtPoint(shootSound, transform.position);
	}
	else
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
}
