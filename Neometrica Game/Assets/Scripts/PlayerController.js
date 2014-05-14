#pragma strict
@script RequireComponent(AudioSource)

var hasHealth : boolean = true;
var health : int = 100;

var hasAmmo : boolean = true;
var ammo : int = 20;

var hasProgress : boolean = true;
var progress : int = 0;

var moveSpeed : float = 10;
var rotateSpeed : float = 100;

var canShoot : boolean = true;
var weaponEquipped : int = 1;
var cannon : Transform;
var bullet : Rigidbody;
var missle : Rigidbody;

var canShockwave : boolean = true;
var shockwave : GameObject;

var explosion : GameObject;
var isExploding : boolean = false;

var collectSound : AudioClip;
var deathSound : AudioClip;
var moveSound : AudioClip;

function Start ()
{
	Screen.showCursor = false;
	yield Explode();
}

function Update () 
{
	ShowStats();
	CheckHealth();
	CheckAmmo();
	Move();
	SwitchWeapon();
	Shoot();
	Shockwave();
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Health")
	{
		//Debug.Log("Player collected Health");
		Destroy(other.gameObject);
		health = 100;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Restored!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Ammo")
	{
		//Debug.Log("Player collected Ammo");
		Destroy(other.gameObject);
		ammo = 20;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Refilled!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Star")
	{
		//Debug.Log("Player collected Star");
		Destroy(other.gameObject);
		progress += 1;
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText(other.gameObject.tag + " Collected!");
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
	}
	
	if (other.gameObject.tag == "Enemy Bullet")
	{
		//Debug.Log("Player hit by Enemy Bullet");
		if (hasHealth)
		{
			health -= 10;
		}
		
	}
	
	if (other.gameObject.tag == "Enemy Pawn")
	{
		//Debug.Log("Player crashed into Enemy Pawn");
		if (hasHealth)
		{
			health -= 50;
		}
	}
	
	if (other.gameObject.tag == "Enemy King")
	{
		//Debug.Log("Player crashed into Enemy Pawn");
		if (hasHealth)
		{
			health = 0;
		}
	}
	
	if (other.gameObject.tag == "Wall")
	{
		//Debug.Log("Player crashed into Wall");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of bounds!");
	}
}

function ShowStats()
{
	if (hasHealth)
	{
		GameObject.Find("GuiHealth").guiText.text = "Health: " + health.ToString();
	}
	
	if (hasAmmo)
	{
		GameObject.Find("GuiAmmo").guiText.text = "Ammo: " + ammo.ToString();
	}
	
	if (hasProgress)
	{
		GameObject.Find("GuiProgress").guiText.text = "Stars Collected: " + progress.ToString() + "/4";
	}
}

function CheckHealth()
{
	if (health <= 0)
	{
		health = 0;
		isExploding = true;	
		DisableRenderers();
		
		yield WaitForSeconds(2);
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are dead!");
		
		yield WaitForSeconds(2);
		Application.LoadLevel(2);
	}
}

function CheckAmmo()
{	
	if (ammo <= 0)
	{
		//Debug.Log("Player is out of Ammo");
		ammo = 0;
		canShoot = false;
		canShockwave = false;
	}
	else
	{
		canShoot = true;
		canShockwave = true;
	}
}

function Move()
{
	var translation : float = Input.GetAxis("Vertical") * moveSpeed;
	var rotation : float = Input.GetAxis("Horizontal") * rotateSpeed;
	
	translation *= Time.deltaTime;
	rotation *= Time.deltaTime;
	
	if (Input.GetAxis("Vertical"))
	{
		transform.Translate(0, 0, translation);
	}
	
	if (Input.GetAxis("Horizontal"))
	{
		transform.Rotate(0, rotation, 0);
	}
}

function Shoot()
{
	if (Input.GetButtonDown("Fire1"))
	{
		if (canShoot)
		{
			switch(weaponEquipped)
			{
				case 0:
				ShootMissle();
				break;
				
				case 1:
				ShootBullet();
				break;
			}
		}
		else
		{
			GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
		}
	}
}

function ShootBullet()
{
	//Debug.Log("Player shot Bullet");
	{
		var bulletInstance : Rigidbody;
		bulletInstance = Instantiate(bullet, cannon.position, cannon.rotation);
		if (hasAmmo)
		{
			ammo -= 1;
		}
	}
}

function ShootMissle()
{
	//Debug.Log("Player shot Missle");
	{
		var missleInstance : Rigidbody;
		missleInstance = Instantiate(missle, cannon.position, cannon.rotation);
		if (hasAmmo)
		{
			ammo -= 5;
		}
	}
}

function SwitchWeapon()
{
	if (Input.GetKeyDown("left alt"))
	{
		switch(weaponEquipped)
		{
			case 0:
			weaponEquipped = 1;
			//Debug.Log("Player changed weapon to Bullet");
			break;
			
			case 1:
			weaponEquipped = 0;
			//Debug.Log("Player changed weapon to Missle");
			break;
		}
	}
}

function Shockwave()
{
	if (Input.GetKeyDown("e"))
	{
		if (canShockwave)
		{
			var shockwaveInstance : GameObject;
			shockwaveInstance = Instantiate(shockwave, transform.position, transform.rotation);
			SendMessage("enableShockwave",true);
			if (hasAmmo)
			{
				ammo -= 10;
			}
		}
		else
		{
			GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
			SendMessage("enableShockwave", false);
		}
	}
}

function Explode()
{
	while(true)
	{
		if (isExploding){
			var explosionInstance : GameObject;
			explosionInstance = Instantiate(explosion, transform.position, transform.rotation);
			AudioSource.PlayClipAtPoint(deathSound, new Vector3(5,1,2));
			yield WaitForSeconds(1.0);
			Destroy(explosionInstance);
			Debug.Log("Player exploded");
			break;
		}
	yield;
	}
}

function DisableRenderers()
{
	var renderers : Renderer[];
	renderers = GetComponentsInChildren.<Renderer>();
	for (var renderer : Renderer in renderers) 
	{
	    renderer.enabled = false;
	}
}
