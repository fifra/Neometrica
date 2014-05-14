#pragma strict

function Start () 
{

}

function Update () 
{
	transform.Rotate(Vector3(1,0,0), 180 * Time.deltaTime);
}