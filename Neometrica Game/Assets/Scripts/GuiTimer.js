#pragma strict

private var timer : float;
private var minutes : int;
private var seconds : int;



function Start () 
{

}

function Update () 
{
	timer += Time.deltaTime;
	minutes = timer / 60;
	seconds = timer % 60;
	
	var timerText : String = minutes.ToString("00") + ":" + seconds.ToString("00");
	GameObject.Find("GuiTimer").guiText.text = timerText;
}