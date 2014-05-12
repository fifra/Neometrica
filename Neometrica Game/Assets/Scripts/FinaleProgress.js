#pragma strict

var allStarsCollected : boolean = false;
var bossIsKilled : boolean = false;

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
}

function CheckProgress()
{
	if (GameObject.Find("Player").GetComponent(PlayerController).progress == 4)
	{
		allStarsCollected = true;
	}
	
	if (GameObject.FindGameObjectWithTag("Enemy King") == null)
	{
		bossIsKilled = true;
	}
	
	if ((bossIsKilled) && (allStarsCollected))
	{
		AdvanceToStartMenu();
	}
}

function AdvanceToStartMenu()
{
	if (allStarsCollected)
	{
		yield WaitForSeconds(2);
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("Mission complete!");
		
		yield WaitForSeconds(2);
		Application.LoadLevel(0);
	}
}