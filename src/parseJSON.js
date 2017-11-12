// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
	var parsedObject;
	//CHAR-BY-CHAR PROGRESSION


  	//evaluate char values and progress down the chain as in http://json.org/
 	var next = function(string) {
 		if (string.length === 0) {
 			return;
 		}

 		cutSpace(string);
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
  		
  		if (string.charAt(0) === 0) {
  			string = string.trim();
  			cutSpace(string);
  		}
  		//else - proceed
  		return string;
  		
  	};
  
  	//iterate through all the breakpoints and decides what to call next
  	var condition = function(string) {

  		if (string.charAt(0) === "{" ) {
  			//run obj

  		} else if (string.charAt(0) === "[") {
  			//run arr

  		} else if (string.charAt(0) === "\"") { // consider escape
  			//run string
  		} else if (string.charAt(0) === "\\") {
  			//run string
  		} else if (string.charAt(0) === "\/") {
  			//run string
  		} else if (string.charAt(0) === "\b") {
  			//run string
  		} else if (string.charAt(0) === "\f") {
  			//run string
  		} else if (string.charAt(0) === "\n") {
  			//run string
  		} else if (string.charAt(0) === "\r") {
  			//run string
  		} else if (string.charAt(0) === "\t") {
  			//run string
  		//} else if (string.charAt(0) === "\u") { - \u causes error
  			//run string

  		} else if (string.charAt(0) === "-") {
  			//run number
  		} else {
  			for (var i = 0; i <= 9; i++) {
  				if (string.charAt(0) === i.toString()) {
  					//run number
  				}
  			}
  		}

  	return;
  	};



  //start with value types	
  	// { is followed by object

  	// [ is followed by array

  	// " is followed by string
  	// - or 0-9 is followed by number

  	//go into number


  	//parsing example:
  	var stringToObj = function(string) {
  		//break if it reaches a ""
		var object = {};
		var key // = part of string
		var value // = part of string
		object[key] = value;

		return object;
		};

	//somewhere in stringToObj it needs to check for the inside values (if chain)
	return parsedObject;
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
