#pragma strict

var allStarsCollected : boolean = false;

function Start ()
{

}

function Update ()
{
	if (Input.GetKey("escape"))
	{
		Application.LoadLevel(0);
	}
	
	CheckProgress();
	
	if (allStarsCollected)
	{
		AdvanceToFinale();
	}
}

function CheckProgress()
{
	if (GameObject.Find("Player").GetComponent(PlayerController).progress == 4)
	{
		allStarsCollected = true;
	}
}

function AdvanceToFinale()
{
	yield WaitForSeconds(2);
	GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("Objective complete!");
	
	yield WaitForSeconds(2);
	Application.LoadLevel(4);
}