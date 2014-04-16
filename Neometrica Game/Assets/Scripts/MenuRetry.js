#pragma strict

function Start ()
{

}

function Update ()
{
	if (Input.GetKey("space")) 
	{
		Application.LoadLevel(1);
	}

	// Make the second button.
	if (Input.GetKey("escape"))
	{
		Application.Quit();
	}
}