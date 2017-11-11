// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


	//gather all object properties;
		//use recursion to select the properties of the properties

		//add them as strings

	//piece them together

	//return the total

  	// your code goes here


  	//use a function that checks for each type and treats it accordingly


var addComma = function (string) {
	if (string.substring(string.length-1) === ","||
		string.substring(string.length-1) === "[" ||
		string.substring(string.length-1) === "{" ||
		string.length === 0) {
		
	} else {
		string += ",";
	}
	return string;
};


var removeComma = function(str) {	

    if (str.substring(str.length-1) === ",") {
        str = str.substring(0, str.length-1);
    }

    return str;
};


var stringifyJSON = function(obj) {
	var string = "";


  	var checkType = function(obj) {
  		if (typeof obj === "number" || typeof obj === "boolean" ) {
  			string = addComma(string);
			string += obj + ",";

		} else if (obj === null) {
			string = addComma(string);
			string += obj + ",";	

		} else if(typeof obj === "function") {
			//logs nothing

		} else if(typeof obj === "string") {
			string = addComma(string);
			string += "\""  + obj + "\"" + ",";
		
		} else if (Array.isArray(obj)) {
			string = addComma(string);
			string += "[";

			for (var i = 0; i < obj.length; i++) {

				var element = obj[i];

				checkType(element);
				
			}
			
			string = removeComma(string);
			string += "]";
			string = addComma(string);


			//in the case of objects we need a "key : value" instead of value only
		} else if (typeof obj === "object") {

			string += "{";

			for(var key in obj){

				var element = obj[key];

				checkPropertyType(element,key);

			}
			string = removeComma(string);
			string += "}";
			string = addComma(string);
		}
		string = removeComma(string); //removes commas between obj and arr
	  };




	  var checkPropertyType = function(value,key) {
  		if (typeof value === "number" || typeof value === "boolean" ) {
  			string = addComma(string);
			string += "\"" + key + "\"" + ":" + value + ",";

		} else if (value === null) {
			string = addComma(string);
			string += "\"" + key + "\"" + ":" + value + ",";	

		} else if(typeof value === "function") {
			//logs nothing

		} else if(typeof value === "string") {
			string = addComma(string);
			string += "\"" + key + "\"" + ":" + "\"" + value + "\"" + ",";
		
		} else if (Array.isArray(value)) {
			string = addComma(string);
			string += "\"" + key + "\"" + ":"
			string += "[";

			for (var i = 0; i < value.length; i++) {

				var element = value[i];

				checkType(element);
				
			}
			
			string = removeComma(string);
			string += "]";
			string = addComma(string);


			//in the case of objects we need a "key : value" instead of value only
		} else if (typeof value === "object") {
			string += "\"" + key + "\"" + ":";
			string += "{";

			for(var key in value){

				var element = value[key];

				checkPropertyType(element,key);

			}
			string = removeComma(string);
			string += "}";
			string = addComma(string);

		}
		string = removeComma(string); //removes commas between value and arr
	  };




	checkType(obj);

  	return string;
};







//testing my function vs the original
stringifiableObjects.forEach(function(element) {
    console.log(element);
    console.log("JSON.stringify = " + JSON.stringify(element));
    console.log("stringifyJSON = " + stringifyJSON(element));
});