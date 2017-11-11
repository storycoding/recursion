// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {

	//CHAR-BY-CHAR PROGRESSION


  	//evaluate char values and progress down the chain as in http://json.org/
 	var next = function() {

	  	//breaks if string length === 0

	  	//identifies the first character in the string;

	  	//removes that first character;

	  		//calls the next step according to current char

	  	
	  	//loop

  	}

  	//ignore all spaces
  	var cutSpace = function(string) {
  		//if first character in string is a space
  			//cut the first space
  			//loop
  		//else - proceed

  	}
  
  	//iterate through all the breakpoints and decides what to call next
  	var condition = function(string) {
  		//if char is (type)
  			//treat body as a var of that type


  	}



  //start with value types	
  	// { is followed by object

  	// [ is followed by array

  	// " is followed by string
  	// - or 0-9 is followed by number

  	//go into number


  	//parsing example:
  	var stringToObj = function(string) {
		var object = {};
		var key // = part of string
		var value // = part of string
		object[key] = value;

		return object;
		}

	//somewhere in stringToObj it needs to check for the inside values (if chain)

};



//flow:

// next - condition - getElementType ...




//testing my function vs the original
var compareParse = function() {

	parseableStrings.forEach(function(test) {
	console.log(test);
    console.log("parseJSON = " + parseJSON(test)); 
     
    console.log("JSON.parse = " + JSON.parse(test));

    console.log("stringified parseJSON = " + JSON.stringify(parseJSON(test)));
    console.log("stringified JSON.parse = " + JSON.stringify(JSON.parse(test)));

    console.log("=======================================");
    });

}
