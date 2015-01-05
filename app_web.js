var rpio = require('./lib/rpio');
var sleep = require('sleep');
rpio.setmode(rpio.BCM);

rpio.cleanup();

rpio.setup(25, rpio.OUT, rpio.HIGH);
rpio.setup(11, rpio.OUT, rpio.HIGH);
rpio.setup(8, rpio.OUT, rpio.HIGH);
rpio.setup(7, rpio.OUT, rpio.HIGH);

function random (low, high) {
	return Math.random() * (high - low) + low;
}



function allumer(pin){
	console.log('Allumer =>'+pin);
	var gpio = pin;
	rpio.output(gpio, 0);
}

function extinction(pin){
	console.log('Extinction = '+pin);
	var gpio = pin;
	rpio.output(gpio, 1);
}

function proj(){
	return 25;
}
function guir_flash(){
	return 11;
}

function guir_neige(){
	return 8;
}
function pere_noel(){
	return 7;
}
function allumertout(){
	allumer(proj()); //Guir blanche
	allumer(guir_flash()); //Proj contre
	allumer(guir_neige()); //Guir flash
	allumer(pere_noel()); //Pere noel
}
function allumertoutlight(){
	allumer(proj()); //Guir blanche
	allumer(guir_flash()); //Proj contre
	allumer(guir_neige()); //Guir flash
}

function eteindretout(){
	extinction(25);
	extinction(11);
	extinction(8);
	extinction(7);
}
function eteindrelight(){
	extinction(proj());
	extinction(guir_flash());
	extinction(guir_neige());
}

var gpio_num = [25,11,8,7]



var express = require('express')
var app = express()
app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendfile('./views/index.html');
})

app.get('/all', function (req, res) {
	allumertout();
	res.send('OK');
})
app.get('/off', function (req, res) {
	eteindretout();
	res.send('OK');
})

app.get('/alllight', function (req, res) {
	allumertoutlight();
	res.send('OK');
})
app.get('/lightoff', function (req, res) {
	eteindrelight();
	res.send('OK');
})
app.get('/pnon', function (req, res) {
	allumer(pere_noel());
	res.send('OK');
})
app.get('/pnoff', function (req, res) {
	extinction(pere_noel());
	res.send('OK');
})
app.get('/onproj', function (req, res) {
	allumer(proj());
	res.send('OK');
})
app.get('/offproj', function (req, res) {
	extinction(proj());
	res.send('OK');
})
app.get('/onneige', function (req, res) {
	allumer(guir_neige());
	res.send('OK');
})
app.get('/offneige', function (req, res) {
	extinction(guir_neige());
	res.send('OK');
})
app.get('/onflash', function (req, res) {
	allumer(guir_flash());
	res.send('OK');
})
app.get('/offflash', function (req, res) {
	extinction(guir_flash());
	res.send('OK');
})









var server = app.listen(81, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
