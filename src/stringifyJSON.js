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
		string.length === 0) {
		
	} else {
		string += ",";
	}
	return string;
};


var removeLastSymbol = function(str,symbol)
{
    if (str.substring(str.length-1) === symbol)
    {
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
			string += "[";

			for (var i = 0; i < obj.length; i++) {

				var element = obj[i];

				checkType(element);
				
			}
			string = removeLastSymbol(string, ",");
			string += "]";


			//in the case of objects we need a "key : value" instead of value only
		} else if (typeof obj === "object") {

			string += "{";

			for(var key in obj){

				var element = obj[key];

				checkType(element);

			}
			string = removeLastSymbol(string, ",");
			string += "}";
		}
		string = removeLastSymbol(string, ","); //removes commas between obj and arr
	  };

	checkType(obj);

  	return string;
};





//testing my function vs the original
stringifiableObjects.forEach(function(element) {
	debugger;
    console.log(element);
    console.log("JSON.stringify = " + JSON.stringify(element));
    console.log("stringifyJSON = " + stringifyJSON(element));
});