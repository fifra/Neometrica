#pragma strict

var ammo : int = 20;

function Start () 
{

}

function Update () 
{
	if (ammo <= 0)
	{
		//Debug.Log("Player is out of Ammo");
		GameObject.Find("GuiMessage").GetComponent(GuiMessage).displayText("You are out of Ammo");
	}
}