//traversing objects with recursion

//example 1 object to object
var charles = {
	elliot : {
		sarah : {},
		samantha: {},
		sandra: {}
	},
	andre : {
		peter: {},
		hannah: {},
		mira: {}
	},
	arthur: {
		matthew: {},
		phill: {},
	},
	steven: {}
};


//example 2 object to string
var derrick = {
	child : {
		child: {
			name: "bob",
			child: {
				name: "sagat",
				child: {
				name: "monkey",
			},
			},
		},
		name: "clarice"},
	name: "derrick"
};


//WIP
function logTree(person) {

	function isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	if (!isEmpty(person)) {
		for(var child in person) {
			console.log(person);
			logTree(person[child]);
		}
	}
	return "----end of tree----";
}

logTree(charles);

function traverse(parent) {
	//debugger;
	var keys = Object.keys(parent); //array of strings
	if (parent.child !== undefined) { //if child is not equal to undefined

		for(var child in parent) {
			traverse(parent[child]);
		}
	} else {
		console.log("parent is: " + parent);
		console.log("parent.name is: " + parent.name);
		return;
	}
	return;
}

traverse(charles);


//traversing arrays with a recursive callback

var array = [1,
	[11,[
		111
	]],
	[12,[
		121
	]],[
		121
	],
	[13,[
		131
	]]
];

function arrayTravel(array) {
	if (Array.isArray(array) && array.length > 0) {
		for (var i = 0; i < array.length; i++) {
			arrayTravel(array[i]);
		}
	} else {
		console.log(array);
	}

}

arrayTravel(array);