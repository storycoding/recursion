// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
	var elements = [];
	// starts from document;
		//run getElementsByClassName on the children;

	//use a helper function inside getElementsById to set the initial children traversal loop
	var traverse = function(parent){
		
		if ( (parent.className) && (parent.className.includes(className)) ) {
				elements.push(parent);
			}

		if(parent.hasChildNodes()) { // this method doesn't work in all children types
			var children = parent.childNodes;

			children.forEach(function(child){
  				traverse(child);
			});
		} 
	
		return;
	};

	//the statement that initiates the travel through the child nodes
	if (document.body.hasChildNodes()) {
		traverse(document);
	} else {
		return undefined;
	}

  	return elements;
};

//var parent = child;
		// if (typeof parent !== "object") { //i tried making an exception handler for the childrent
		// 										//that can't have .hasChildNodes() applied to them
		// 	return;

	//select the root of the DOM
		//traverse downwards to the childnodes
			//if the childest node contains all of the elements in the var className, add it to the element array
			//else - return and go to the direct parent & traverse to other child, if any
			//else - go back to the parent of the parent

			//recurse this ^^^^

  // Returns an array-like object of all child elements which have all of the given class names.


//what is the condition for selecting the element? is it the first from parent to child, or the "deepest" child?