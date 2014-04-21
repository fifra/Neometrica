#pragma strict

var horizontalSpeed : float = 2.0;

function Start () 
{

}

function Update () 
{
	var h : float = horizontalSpeed * Input.GetAxis ("Mouse X");
	transform.Rotate (0, h, 0);
}