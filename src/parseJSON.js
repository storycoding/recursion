//===========================================//
//============ helper functions =============//
//===========================================//

var cutAllSpaces = function(string) {
	var spacedOutString = "";
	var insideQuotes = false;


	//cuts out the spaces outside quote marks ""
	//stores the result in a new string
	
	
	while (string.length >= 1) {

		while (!insideQuotes) {
			if (string.charAt(0) === " ") {
				string = string.substr(1);

		//check if we're etering quotes
			} else if (string.charAt(0) === "\"") {
				string = string.substr(1);
				insideQuotes = !insideQuotes; //swaps to true

			} else {
				spacedOutString += string.charAt(0);
				string = string.substr(1);
			}
			
		  if	(string.length < 1) {
		    break;
		  }
			}


		//inside quotes, add everything
 		while (insideQuotes) {
			if (string.charAt(0) === "\"") {
			  string = string.substr(1);
				insideQuotes = !insideQuotes; //swaps to false
			
			} else {
				spacedOutString += string.charAt(0);
				string = string.substr(1);
 			}
		}
		
  if	(string.length < 1) {
		    break;
		  }

	}
	

	return spacedOutString;
};


//===========================================//
//============ array or object ==============//
//===========================================//

	var takeObject = function(string) {
  		var object = {};
  		pair(string,object);
  	};


  	var takeArray = function(string) {
  		var array = [];
  		sequence(string,array);
  	};


//===========================================//
//============ JSON progression =============//
//===========================================//

	//evaluate char values and progress down
	//the chain as in http://json.org/

	var next = function(string) {

		//breaks if string length === 0
		if (string.length === 0) {
			return;
		}

  	condition(string);
  	//identifies the first character in the string;

  	//removes that first character;

  		//calls the next step according to current char

  	
  	//loop

	};



	//iterate through all the breakpoints and decides what to call next
	var condition = function(string) {

		if (string.charAt(0) === "{" ) {
			//run obj

		} else if (string.charAt(0) === "[") {
			//run arr

		} else if (string.charAt(0) === "\"") { // consider escape
			takeString(string);
		} else if (string.charAt(0) === "\\") {
			takeString(string);
		} else if (string.charAt(0) === "\/") {
			takeString(string);
		} else if (string.charAt(0) === "\b") {
			takeString(string);
		} else if (string.charAt(0) === "\f") {
			takeString(string);
		} else if (string.charAt(0) === "\n") {
			takeString(string);
		} else if (string.charAt(0) === "\r") {
			takeString(string);
		} else if (string.charAt(0) === "\t") {
			takeString(string);
		//} else if (string.charAt(0) === "\u") { - \u causes error
			//run string

		} else if (string.charAt(0) === "-") {
			takeNumber(string);

		} else {
			for (var i = 0; i <= 9; i++) {
				if (string.charAt(0) === i.toString()) { //CHECK THIS
					takeNumber(string);
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


//===========================================//
//============ grabbing elements ============//
//===========================================//

var takeString = function(string) { //BEWARE ESCAPEES
	var text = "";
	//break if it reaches "\""
	while(true) {
		text += string.charAt(0);
		string = string.substr(1);
		
		if (string.charAt(0) === "\"") {
			break;
		}
	}

	return text;
};



var takeNumber = function(string) {
	var text = "";
	//break if it reaches "," or a space or "}" or "]"
	while (true) {
		text += string.charAt(0);
		string = string.substr(1);
		
		if (string.charAt(0) === "," ||
		string.charAt(0) === "}" ||
		string.charAt(0) === "]" ||
		string.charAt(0) === " " ) {
			break;
		}
	}

	number = parseFloat(text);
	return number;
};



var takeNullTrueFalse = function(string) {
	var type = "";

	while (true) {
		type += string.charAt(0);
		string = string.substr(1);
		
		if (string.charAt(0) === "," ||
		string.charAt(0) === "}" ||
		string.charAt(0) === "]" ||
		string.charAt(0) === " " ) {
			string = string.substr(1);
			break;
		}
	}


	if (type === "true") {
		return true;

	} else if (type === "false") {
		return false;

	} else if (type === "null") {
		return null;

	} else {
		console.log("failed to define type.");
		console.log("string state: " + string);
		console.log("type state: " + type);
		return;
	}

};



//===========================================//
//=========== adding and pushing ============//
//===========================================//

	
	//takes an obj and gives it a pair from string
	var pair = function(string,object) { // CHECK FOR SPACES
		var key = (takeString(string));
		var value = "";


		object[key] = condition(string); // CHECK FOR NESTED OBJS
		if (string.charAt(0) === ",") {
			string = string.substr(1);
			pair(string,object);
		}
	};

	//will keep adding until it reaches a "]"
	var sequence = function(string,array) {
		var value = condition(string);
		array.push(value);
		if(string.charAt(0) !== "]") {
			sequence(string,array);
		}
	};





//===========================================//
//================ parseJSON ================//
//===========================================//

var parseJSON = function(json) {

	//rid of pointless spaces
	json = cutAllSpaces(json);

	//the parent
	var parsedObject;

	//object or array?
	if (string.charAt(0) === "{") {
		string = string.substr(1);
		parsedObject = takeObject(json);

	} else if (string.charAt(0) === "[") {
		string = string.substr(1);
		parsedObject = takeArray(json);
	}
	// somewhere in stringToObj it needs to
	// check for the inside values (if chain)

	return parsedObject;
};



//===========================================//
//============ compare results ==============//
//===========================================//

var compareParse = function() {

	parseableStrings.forEach(function(test) {
	console.log(test);
    console.log("parseJSON = " + parseJSON(test)); 
     
    console.log("JSON.parse = " + JSON.parse(test));

    console.log("stringified parseJSON = " + JSON.stringify(parseJSON(test)));
    console.log("stringified JSON.parse = " + JSON.stringify(JSON.parse(test)));

    console.log("=======================================");
    });

};
