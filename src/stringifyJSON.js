// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var string = "";
	//gather all object properties;
		//use recursion to select the properties of the properties

		//add them as strings

	//piece them together

	//return the total

  	// your code goes here

	if (typeof obj === "number" || typeof obj === "boolean") {
		string += obj;
	}

	if(typeof obj === "function" ||  !obj) {
		//logs nothing
	}

	if (typeof obj === "object") {

		string += "{";

		for(var key in obj){
			if(typeof obj[key] === "function" || obj[key] === undefined) {
				//logs nothing

			} else if (typeof obj[key] === "string") {
				string += "\"" + key.toString() + "\"" + ":" + "\"" + obj[key] + "\"" + ",";

			} else if (typeof obj[key] === "number") {
				string += "\"" + key.toString() + "\"" + ":"  + obj[key] + ",";

			} else if (typeof obj[key] === "boolean") {
				string += "\"" + key.toString() + "\"" + ":"  + obj[key] + ",";

			} else if (Array.isArray(obj[key])){
				string += "\"" + key.toString() + "\"" + ":";
				string += "[";
				for (var i = 0; i < obj[key].length; i++) {
					string += "\"" + obj[key][i].toString() + "\",";
				}
				string = string.slice(0, -1);
				string += "]";
			}
		}
		string += "}";
	}

	


	

 	return string;
};
	

//testing my function vs the original
stringifiableObjects.forEach(function(element) {
    console.log(element);
    console.log("JSON.stringify = " + JSON.stringify(element));
    console.log("stringifyJSON = " + stringifyJSON(element));
});