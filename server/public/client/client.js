$( document ).ready( onReady );

function onReady(){
    $( document ).on( 'click', '#addTaskBtn', addTask );
} // end onReady

function addTask(){
    let objectToSend = {
        task: $( '#taskIn' ).val(),
        urgency: $( '#urgencyIn' ).val(),
        status: 'Incomplete'
    } // end objectToSend
    $.ajax( {
        method: 'POST',
        url: `/tasks`,
        data: objectToSend
    } ).then( function( response ) {
        console.log( 'inside of ajax GET, response:', response );
        getTask();
    } ).catch( function( err ) {
        alert( 'error in ajax POST' );
        console.log( err );
    } ); // end ajax POST
} // end addTask

function getTask(){
    $.ajax( {
        method: 'GET',
        url: `/tasks`
    } ).then( function( response ) {
        console.log( 'inside of ajax GET, response:', response );
        let el = $( '#listOut' );
        el.empty();
        for( let i = 0; i < response.length; i++ ){
            el.append( `
                <li>
                    ${ response[ i ].task }
                    ${ response[ i ].urgency }
                    ${ response[[ i ]].status }
                </li>
            ` ); // end append
        } // end for
    } ).catch( function( err ) {
        alert( 'error in ajax GET' );
        console.log( err );
    } ); // end ajax GET
} // end getTask