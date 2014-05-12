#pragma strict

function Start ()
{

}

function Update ()
{
	if (Input.GetKey("space")) 
	{
		Application.LoadLevel(5);
	}

	// Make the second button.
	if (Input.GetKey("escape"))
	{
		Application.Quit();
	}
}