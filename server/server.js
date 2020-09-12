// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pg = require( 'pg' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 3000;
const Pool = pg.Pool;
const pool = new Pool( {
    database: 'to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
} );

// listen
app.listen( port, () => {
    console.log( 'listen on port', port );
} );

// POST
app.post( '/tasks', ( req, res ) => {
    console.log( 'in app.post, req.body:', req.body );
    const queryString = `INSERT INTO "to-do" ( task, urgency, status ) VALUES ( $1, $2, $3 );`;
    pool.query( queryString, [ req.body.task, req.body.urgency, req.body.status ] ).then( ( results ) => {
        res.sendStatus( 201 );
    } ).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end POST

// GET
app.get( '/tasks', ( req, res ) => {
    console.log( 'in app.get' );
    const queryString = 'SELECT * FROM "to-do";';
    pool.query( queryString ).then( ( results ) => {
        res.send( results.rows );
    } ).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end GET