// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
};



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
