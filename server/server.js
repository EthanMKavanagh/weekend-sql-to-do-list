// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pg = ( 'pg' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const post = 3000;
const Pool = pg.Pool;
const pool = new Pool( {
    database: 'weekend-to-do-app',
    host: 'localhost',
    post: 5432,
    max: 12,
    idleTimeoutMillis: 30000
} );

// listen
app.listen( post, () => {
    console.log( 'listen on port', port );
} );