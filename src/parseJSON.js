//===========================================//
//============ helper functions =============//
//===========================================//

function runWithDebugger(callback,args) {
	debugger;
	return callback(args);
}

// removes all unnecessary spaces and escape characters
function fixJSON(json) {
	var fixedJson = "";
	var insideQuotes = false;

	//cuts out the spaces and escape chars outside double quotes
	//stores the result in a new string
	
	while (json.length >= 1) {

		//outside
		while (!insideQuotes) {
			if (json.charAt(0) === " ") {
				json = json.substr(1);

			} else if ( json.charAt(0) === "\\"  ||
				 json.charAt(0) === "\/"  ||
				 json.charAt(0) === "\b"  ||
				 json.charAt(0) === "\f"  ||
				 json.charAt(0) === "\n"  ||
				 json.charAt(0) === "\r"  ||
				 json.charAt(0) === "\t"
				) {
				json = json.substr(1);


		//check if we're etering quotes
			} else if (json.charAt(0) === "\"") {
				fixedJson += "\"";
				json = json.substr(1);
				insideQuotes = !insideQuotes; //swaps to true

			} else {
				fixedJson += json.charAt(0);
				json = json.substr(1);
			}
			
		  if (json.length < 1) {
		    break;
		  }
			}

		//inside quotes, add everything
 		while (insideQuotes) {
 			if (json.charAt(0) === "\\") {
 				fixedJson += "\\";
			  	json = json.substr(1);
 			}

			if (json.charAt(0) === "\"") {
				fixedJson += "\"";
			  	json = json.substr(1);
				insideQuotes = !insideQuotes; //swaps to false

			} else if (json.charAt(0) === "\'") {
				fixedJson += "\'";
				json = json.substr(1);


			} else {
				fixedJson += json.charAt(0);
				json = json.substr(1);
 			}
		}
		
	  	if	(json.length < 1) {
			    break;
			  }
		}
	
	return fixedJson;
}


//===========================================//
//============ array or object ==============//
//===========================================//

function takeObject() {
	var object = {};
	json = json.substr(1); //removes "{"

  //if object is empty return it
  if (json.charAt(0) === "}") {
    json = json.substr(1);
    return object;
  }

	object = pair(object);
	json = json.substr(1); //removes "}"
	return object;
}


function takeArray() {
	var array = [];
	json = json.substr(1); //removes "["
	array = sequence(array);
	json = json.substr(1); //removes "]"
	return array;
}

//===========================================//
//============ grabbing elements ============//
//===========================================//

function takeString() { //BEWARE ESCAPEES
	var string = "";
	json = json.substr(1); //removes the opening "
	//break if it reaches "\""

	//string += "\""; //opens string bracket

	while(true) {
		string += json.charAt(0);
		json = json.substr(1);
		
		if (json.charAt(0) === "\"") {
			json = json.substr(1); //removes the closing "
			break;
		}
	}
	//string += "\"";

	return string; //closes string bracket
}


function takeNumber() {
	var text = "";
	//break if it reaches "," or a space or "}" or "]"
	while (true) {
		text += json.charAt(0);
		json = json.substr(1);
		
		if (json.charAt(0) === "," ||
		json.charAt(0) === "}" ||
		json.charAt(0) === "]" ||
		json.charAt(0) === " " ) {
			break;
		}
	}

	number = parseFloat(text);
	return number;
}



function takeNullTrueFalse() {
	var type = "";

	while (true) {
		type += json.charAt(0);
		json = json.substr(1);
		
		if (json.charAt(0) === "," ||
		json.charAt(0) === "}" ||
		json.charAt(0) === "]" ||
		json.charAt(0) === " " ) {
			json = json.substr(1);
			break;
		}
	}


	if (type === "true") {
		return true;
	}

	if (type === "false") {
		return false;
	}

	if (type === "null") {
		return null;
	}

}



//===========================================//
//=========== adding and pushing ============//
//===========================================//

	
//takes an obj and gives it a pair from string
function pair(object) { // CHECK FOR SPACES
	var key = (takeString());
	json = json.substr(1); // remmoves the colon
	var value = nextCondition();

	object[key] = value;

	if (json.charAt(0) === ",") {
		json = json.substr(1); // remmoves the comma
		pair(object);
	}

	return object;
}


//will keep adding until it reaches a "]"


function sequence(array) {
	var value = nextCondition();

	if (value !== undefined) {
		array.push(value);

		if(json.charAt(0) === ",") {
			json = json.substr(1); // remmoves the comma
			sequence(array); //not giving me the second element
		}
	}
	

	return array;
}




//===========================================//
//============ compare results ==============//
//===========================================//

function compareParse() {

	parseableStrings.forEach(function(test) {
	console.log(test);
    console.log("parseJSON = " + parseJSON(test)); 
     
    console.log("JSON.parse = " + JSON.parse(test));

    console.log("stringified parseJSON = " + JSON.stringify(parseJSON(test)));
    console.log("stringified JSON.parse = " + JSON.stringify(JSON.parse(test)));

    console.log("=======================================");
    });

}

//it breaks when iterating over the array
function parseAllJSON() {
	parseableStrings.forEach(function(test) {
		parseJSON(test);

	});
}

function fixAllJsons() {

	parseableStrings.forEach(function(test) {
	console.log(test);
    console.log("original string = " + test); 
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    console.log("fixed string = " + fixJSON(test));
    console.log("=======================================");
    });

}



//===========================================//
//================ parseJSON ================//
//===========================================//

function parseJSON(string) {
	//debugger;
	//remove extra spaces
	

	string = fixJSON(string);
	window.json = string;

	//the root
	var parent;

	//object or array?
	if (string.charAt(0) === "{") {
		parent = takeObject();
		

	} else if (string.charAt(0) === "[") {
		parent = takeArray();
		
	}

	return parent;
}

//===========================================//
//============ JSON progression =============//
//===========================================//

//evaluate char values and progress down
//the chain as in http://json.org/
function nextCondition(object) {
	var value;

	if (json.length === 0) {
		return value;
	}

	if (json.charAt(0) === "{" ) {
		value = takeObject(json,object);

	} else if (json.charAt(0) === "[") {
		value = takeArray(json,object);
	//numbers

	} else if (json.charAt(0) === "\"") {
		value = takeString(json);


	} else if (json.charAt(0) === "-") {
		value = takeNumber(json);

	} else if (json.charAt(0) === "t" || json.charAt(0) === "f" || json.charAt(0) === "n") {
		value = takeNullTrueFalse();
		
	} else {
		for (var i = 0; i <= 9; i++) {
			if (json.charAt(0) === i.toString()) { //CHECK THIS
				return takeNumber(json);
			}
		}
	}

	

	// if (string.length > 0) {
	// 	return nextCondition(string,object);
	// }
	
return value;
}