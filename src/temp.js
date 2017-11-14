//===========================================//
//============ array or object ==============//
//===========================================//

var takeObject = function(json) {
	var object = {};
	json = json.substr(1); //removes "{"

    //if object is empty return it
    if (json.charAt(0) === "}") {
      json = json.substr(1);
      return object;
    }

		object = pair(json,object);
		json = json.substr(1); //removes "}"
		return object;
	};


	var takeArray = function(json) {
		var array = [];
		json = json.substr(1); //removes "["
		array = sequence(json,array);
		json = json.substr(1); //removes "]"
		return array;
	};


