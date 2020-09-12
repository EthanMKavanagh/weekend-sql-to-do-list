$( document ).ready( onReady );

function onReady(){
    getTask();
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
            if( response[ i ].status === 'Incomplete' ){
                el.append( `
                <tr>
                    <td>${ response[ i ].task }</td>
                    <td>${ response[ i ].urgency }</td>
                    <td>${ response[ i ].status }</td>
                    <td><button id="changeStatusBtn" data-id="${ response[ i ].id }">Change Status</button></td>
                    <td><button id="deleteBtn" data-id="${ response[ i ].id }">Delete</button></td>
                </tr>
            ` ); // end append
            } // end if
            else{
                el.append( `
                <tr>
                    <td>${ response[ i ].task }</td>
                    <td>${ response[ i ].urgency }</td>
                    <td>${ response[ i ].status }</td>
                    <td></td>
                    <td><button id="deleteBtn" data-id="${ response[ i ].id }">Delete</button></td>
                </tr>
            ` ); // end append
            } // end else
        } // end for
    } ).catch( function( err ) {
        alert( 'error in ajax GET' );
        console.log( err );
    } ); // end ajax GET
} // end getTask