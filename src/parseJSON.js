//===========================================//
//============ helper functions =============//
//===========================================//

// removes all unnecessary spaces and escape characters
var fixJSON = function(string) {
	var spacedOutString = "";
	var insideQuotes = false;


	//cuts out the spaces and escape chars outside double quotes

	//stores the result in a new string
	
	
	while (string.length >= 1) {

		while (!insideQuotes) {
			if (string.charAt(0) === " ") {
				string = string.substr(1);

			} else if ( string.charAt(0) === "\\"  ||
				 string.charAt(0) === "\/"  ||
				 string.charAt(0) === "\b"  ||
				 string.charAt(0) === "\f"  ||
				 string.charAt(0) === "\n"  ||
				 string.charAt(0) === "\r"  ||
				 string.charAt(0) === "\t"
				) {
				string = string.substr(1);


		//check if we're etering quotes
			} else if (string.charAt(0) === "\"") {
				spacedOutString += "\"";
				string = string.substr(1);
				insideQuotes = !insideQuotes; //swaps to true

			} else {
				spacedOutString += string.charAt(0);
				string = string.substr(1);
			}
			
		  if (string.length < 1) {
		    break;
		  }
			}

		//inside quotes, add everything
 		while (insideQuotes) {
			if (string.charAt(0) === "\"") {
				spacedOutString += "\"";
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
//================ parseJSON ================//
//===========================================//

var parseJSON = function(json) {

	//remove extra spaces
	json = fixJSON(json);

	//the root
	var parent;

	//object or array?
	if (json.charAt(0) === "{") {
		json = json.substr(1); //removes "{"
		parent = {};
		parent = pair(json,parent);
		json = json.substr(1); //removes "}"

	} else if (json.charAt(0) === "[") {
		json = json.substr(1); //removes "["
		parent = [];
		parent = sequence(json,parent);
		json = json.substr(1); //removes "]"
	}

	return parent;
};


//===========================================//
//============ array or object ==============//
//===========================================//

	var takeObject = function(string,object) {
  		pair(string,object);
  		return object;
  	};


  	var takeArray = function(string,array) {
  		sequence(string,array);
  		return array;
  	};


//===========================================//
//============ JSON progression =============//
//===========================================//

	//evaluate char values and progress down
	//the chain as in http://json.org/
	var nextCondition = function(string,object) {

		if (string.length === 0) {
			return;
		}

		if (string.charAt(0) === "{" ) {
		string = string.substr(1);
		//treat it as object pairs
		object = pair(string,object);

		} else if (string.charAt(0) === "[") {
			string = string.substr(1);

			if (typeof object === "object") {
				var key = takeString(string);
				var value = nextCondition(string,object);
				object[key] = value;

			} else {
				var element = nextCondition(string,object);
				object.push(element);
			}
			//run arr

		} else if (string.charAt(0) === "\"") { // consider escape
			return takeString(string);

		} else if (string.charAt(0) === "\\") {
			return takeString(string);

		} else if (string.charAt(0) === "\/") {
			return takeString(string);

		} else if (string.charAt(0) === "\b") {
			return takeString(string);

		} else if (string.charAt(0) === "\f") {
			return takeString(string);

		} else if (string.charAt(0) === "\n") {
			return takeString(string);

		} else if (string.charAt(0) === "\r") {
			return takeString(string);

		} else if (string.charAt(0) === "\t") {
			return takeString(string);

		//} else if (string.charAt(0) === "\u") { - \u causes error
			//run string

		} else if (string.charAt(0) === "-") {
			return takeNumber(string);

		} else {
			for (var i = 0; i <= 9; i++) {
				if (string.charAt(0) === i.toString()) { //CHECK THIS
					return takeNumber(string);
				}
			}
		}

		//think of scenarios to return object instead
		if (string.charAt(0) === "}") {
			string = string.substr(1);
			return object;

		} else if (string.charAt(0) === "]") {
			string = string.substr(1);
			return object;

		} else if (string.charAt(0) === "\"") {
			string = string.substr(1);
			return object;
		}

		if (string.length > 0) {
			return nextCondition(string,object);
		}
		
	return object;
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
	string = string.substr(1); //removes the opening "
	//break if it reaches "\""

	text += "\""; //opens string bracket

	while(true) {
		text += string.charAt(0);
		string = string.substr(1);
		
		if (string.charAt(0) === "\"") {
			string = string.substr(1); //removes the closing "
			break;
		}
	}
	text += "\"";

	return text; //closes string bracket
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
		string = string.substr(1); // remmoves the colon
		var value = nextCondition(string);


		object[key] = value; // CHECK FOR NESTED OBJS

		if (string.charAt(0) === ",") {
			string = string.substr(1); // remmoves the comma
			pair(string,object);
		}

		return object;
	};

	//will keep adding until it reaches a "]"
	var sequence = function(string,array) {
		var value = nextCondition(string);
		array.push(value);
		if(string.charAt(0) !== "]") {
			sequence(string,array);
		}
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
