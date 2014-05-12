#pragma strict

var maxSize = 5.0;  
var growthRate = 1.0;
var scale = 1.0;

function Start ()
{
	
}
 

function Update()

{
    transform.localScale = Vector3.one * scale;
    scale += growthRate * Time.deltaTime;
    
   	transform.Rotate(Vector3(0,20,0), 180 * Time.deltaTime);
    
    if (scale > maxSize)
    {
    	Destroy(gameObject);
    }
}