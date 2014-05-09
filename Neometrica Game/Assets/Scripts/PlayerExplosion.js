#pragma strict

var maxTime = 1.0; //time in seconds 

var endTime = 0.0;

@script RequireComponent(AudioSource)
var explodeSound : AudioClip;

function Start ()
{
	AudioSource.PlayClipAtPoint(explodeSound, transform.position);
	//this is the time when the object was instanced
	endTime = Time.time+maxTime;	
	
}
 

function Update()

{

	
    if (Time.time > endTime)
    {
    	Destroy(gameObject);
    }
}