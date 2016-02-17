/*
* This is a random problem generator for BrainFloss Soccer App
* Aspen Hopkins
* Only call randomQ, all other functions support it.
* right now, only the second variables in level2 and 3 
* are unique beyon the first digit (that is, in the tens or hundreds spot)
*/

randomProblemGenerator: function (level){ //level is in int
	var array;
	if (level === 1) 
		array = makeArray(levelOne());
	if else(level === 2)
		array = makeArray(levelTwo());
	if else(level === 3)
		array = makeArray(levelThree());
	
	return array;
}


makeArray: function(firstN, secondN){
 var addProblem = [firstN, secondN];
}

levelOne: function(){

	var r = Math.floor(Math.random()*10);// it will round down 
	var n = Math.floor(Math.random()*10);

	if(r === 9)
		n = n%2;	
	else if(r === 8)
		n = n%3;
	else if(r === 7)
		n = n%4;
	else if(r === 6)
		n = n%5;	
	else if(r === 5)
		n = n%6;	
	else if(r === 4)
		n = n%7;	
	else if(r === 3)
		n = n%8;	
	else if(r === 2)
		n = n%9;
	else if(r === 1)
		n = n%10;
	else 
	n = n; //put here for my peace of mind 

	return r, n;

} // closes levelOne function

levelTwo: function(){
	var r = Math.floor(Math.random()*10);// it will round down 
	r = r*10; // makes variable a tens
	var n = Math.floor(Math.random()*10);
	var final;
	if(r === 90){
		n = (n%2)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 80){
		n = (n%3)*10;
		final = levelTwoUnique(n);
	} 
	else if(r === 70){
		n = (n%4)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 60){
		n = (n%5)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 50){
		n = (n%6)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 30){
		n = (n%8)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 20){
		n = (n%9)*10;
		final = levelTwoUnique(n);	
	} 
	else if(r === 10){
		n = (n%10)*10;
		final = levelTwoUnique(n);
	}
	else {
		n = n*10;
		final = levelTwoUnique(n);
	}
	var rinal = levelTwoUnique(r);
	return rinal, final;
} //closes levelTwo function

levelThree:function(){
	var r = Math.floor(Math.random()*10);// it will round down 
	r = r*100;
	var n = Math.floor(Math.random()*10);
	var final;
	if(r === 900){
		n = (n%2)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 800){
		n = (n%3)*100;
		final = levelThreeUnique(n);
	} 
	else if(r === 700){
		n = (n%4)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 600){
		n = (n%5)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 500){
		n = (n%6)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 300){
		n = (n%8)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 200){
		n = (n%9)*100;
		final = levelThreeUnique(n);	
	} 
	else if(r === 100){
		n = (n%10)*100;
		final = levelThreeUnique(n);
		
	}
	else {
		n = n*100;
		final = levelThreeUnique(n);
	}
	var rinal = levelThreeUnique(r);
	return rinal, final;
}// closes levelThree

/*
*The following functions (2) create a different, more complex variable for var's returned
*/
levelTwoUnique:function(initial){
	var i = Math.floor(Math.random()*10);
	var sub = initial; 

	if(boolCreator){ //true/false to determine if subtract or add of random value 
		while(sub<initial){
			sub = sub + i;
		}
	else
		sub = sub - i;

	return sub;
} 


levelThreeUnique:function(initial){
	var i = Math.floor(Math.random()*10)*10; //creates num in tens place
	var is = Math.floor(Math.random()*10); //creates num in ones
	var sub = initial - i -is; //subtracts from initial, makes new value for second var
	return sub;
}


/*
Creates a boolean determiner for if the random number should be subtracted or added to the 
new number 
*/
boolCreator:function(){
	var t = Math.random();
	if (t>.50)
		return true;
	else
		return false;
} 


