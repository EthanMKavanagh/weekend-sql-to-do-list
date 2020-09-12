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

    } ).catch( function( err ) {
        alert( 'error in ajax POST' );
        console.log( err );
    } ); // end ajax POST
} // end addTask