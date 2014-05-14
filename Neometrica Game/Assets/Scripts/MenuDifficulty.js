#pragma strict

function Start ()
{

}

function Update ()
{
	if ((Input.GetKey("1")) || (Input.GetKey("[1]")))
	{
		Application.LoadLevel(1);
	}
	
	if ((Input.GetKey("2")) || (Input.GetKey("[2]")))
	{
		Application.LoadLevel(2);
	}
	
	if ((Input.GetKey("3")) || (Input.GetKey("[3]")))
	{
		Application.LoadLevel(3);
	}
	
	// this is a cheat to load the boss level immediately
	if ((Input.GetKey("4")) || (Input.GetKey("[4]")))
	{
		Application.LoadLevel(4);
	}

	// Make the second button.
	if (Input.GetKey("escape"))
	{
		Application.Quit();
	}
}