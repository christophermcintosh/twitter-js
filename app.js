const socketio = require('socket.io');
const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const app = express(); // creates an instance of an express application
const routes = require('./routes');
const bodyParser = require('body-parser');

var server = app.listen(3000,() => console.log('Server Is Listening'));
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var router = routes(io);
app.use( '/', router);

app.use(express.static('public'));

nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(function(req, res, next){
  console.log('Request made at ' + Date());
  console.log('Request Type: ' + req.method);
  console.log('Request Path: ' + req.url);
  next();
});

app.get('/', (req, res) => (res.sendFile(__dirname + res.url)));

// app.listen(3000, () => console.log('server listening'));

/*
Request is essentially the browser sending a request to that specific URL,

Then the server can send back a response, in this case something like "news is crazy"
*/
