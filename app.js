const express     = require("express");
const compression = require('compression');
const app         = express();
const router      = express.Router();
const http        = require("http");
const bodyParser  = require('body-parser');
const server      = http.createServer(app);
const mongoose    = require('mongoose'); 

/* Config. express - server */
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(function(req, res, next) {
    console.log("[ API ] -> /" + req.method +' -> '+ req.path);
    next();
});


/* Rutas del API */
var server_status = require('./server-status')(router);
var server_routes = require('./routes/tvshows')(router); 

var puerto = 3000
/* Inicio - server */
app.use("/api", router);

app.use('*', function(req,res){
    res.status(404).json({status: 'ERROR', result: '404'});
});

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

app.listen(puerto, function(){
    console.log('[ API ] -> Servidor listo, - port: '+puerto);
});
