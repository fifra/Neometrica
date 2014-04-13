#pragma strict

private var timer : float;
private var displayTime : float;
private var timerIsActive : boolean;
private var message : String;

function Start () 
{
	guiText.text = "";
}

function startTimer()
{
	timer = 0.0f;
	guiText.text = message;
	timerIsActive = true;
	displayTime = 1.0f;
}

function Update () 
{
	if (timerIsActive)
	{
		timer += Time.deltaTime;
		if (timer > displayTime)
		{ 
			timerIsActive = false;
			guiText.text="";
		}
	}
}

function displayText(text : String)
{
	message = text;
	startTimer();
}