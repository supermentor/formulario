var express = require('express');
var app = express();
var credentials = require('./credentials.js');

var handlebars = require('express-handlebars').create({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
});

//Set up view engine (Handlebars)
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Static Files
app.use(express.static(__dirname + '/public'));

//Body Parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

//Routes
app.get('/', (req, res) =>{
    res.render('home');
});
app.post('/process', (req, res) => {
    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        console.log('Form (from querystring): ' + req.query.form);
        console.log('CSRF token (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        console.log('Email (from visible form field): ' + req.body.email);
        res.send({ success: true, name: req.body.name });
    } else {
        // if there were an error, we would redirect to an error page
        
    }
});

app.listen(app.get('port'), function(){
    console.log("Server started on http://localhost:" + app.get('port'));
})