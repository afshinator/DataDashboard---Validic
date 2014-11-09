// Validic data visualizer

// app.js

// 

$(function() {


    // Validic Sample Data
    var organizationID = '51aca5a06dedda916400002b',
    	accessToken = 'ENTERPRISE_KEY';

    var baseValidicURL = 'https://api.validic.com/v1/organizations/',
    	urlTail = '.json?access_token=' + accessToken;
    	connectUrl = baseValidicURL;

    var users = {};


    // Sanity Check #2: 
    $.get( 'https://api.validic.com/v1/organizations/'+organizationID+'/fitness.json?access_token=' + accessToken, function( data ) {
    	var d = JSON.stringify ( data );
    	var cals = [], distance = [], duration = [];
    	console.log( d );
    	console.log(data);

    	for (var i = 0 ; i < data.fitness.length; i++ ) {
    		if ( users[ data.fitness[i].user_id ] === undefined ) {
    			users[ data.fitness[i].user_id ] = {};
    			users[ data.fitness[i].user_id ].count = 1;
    		}
    		else users[ data.fitness[i].user_id].count++;

    		cals.push( data.fitness[i].calories );
    		distance.push( data.fitness[i].distance );
    		duration.push( data.fitness[i].duration );    		
    		console.log(i + ' :   calories:' + data.fitness[i].calories + '  distance:' + data.fitness[i].distance );
    	}
    	console.log(users);

    	var chart = c3.generate({
    		bindto: '#grid-1-1',
    		data: {
    			columns: [ cals ]
    		}
    	});

    	var chart2 = c3.generate({
    		bindto: '#grid-2-1',
    		data: {
    			columns: [ distance ]
    		}
    	});

    	var chart2 = c3.generate({
    		bindto: '#grid-1-2',
    		data: {
    			columns: [ duration ]
    		}
    	});    	

    	var keys = Object.keys( users ) ,
    		index = 0;

    	console.log('We have ' + keys.length + ' users.' );

    	// while ( index < keys.length ) {

    	// }

  //   	for (var key in users) {
  //   		console.log('--~>' + key );
		// 	$.get( 'https://api.validic.com/v1/organizations/' + organizationID + '/users/' + key + '/nutrition.json?access_token=' + accessToken, function( data ) {
		// 		var d = JSON.stringify ( data );
		// 		console.log( data);
		// 	});
		// }


	});



    var init = function() { 
	    // Sanity Check: Establish initial connection, verify credentials with validic
	    $.get( baseValidicURL + organizationID + urlTail, function( data ) {
	    	var d = JSON.stringify ( data );
	    	console.log( 'Validic API successfully reached...' );
	    	console.log( d )

	    	$('#userId').text( data.organization.name );			// Set the organization name to topbar of page
			  // $( "#grid-1-1" ).html( JSON.stringify( data ) );
		});



    }();





});