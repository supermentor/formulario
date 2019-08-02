var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

//Routes
app.get('/', (req, res) =>{
    res.render('home');
});
app.use(function(res, req, next){
    res.type('text/plain');
    res.status(500);
    res.send("500 - Server Error");
});
app.use(function(res, req, next){
    res.type('text/plain');
    res.status(404);
    res.send("404 - Not Found");
});

app.listen(app.get('port'), function(){
    console.log("Server started on http://localhost:" + app.get('port'));
})