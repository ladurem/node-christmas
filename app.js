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

var gpio_num = [25,11,8,7];
var timer = 0;
var statut_pn = false;

while(1){
	var date = new Date();
	var current_day = date.getDate();
	var current_hour = date.getHours();
	var current_minute = date.getMinutes();
	var current_secondes = date.getSeconds();
	console.log(date);
	//SONORE

	if((current_hour>8 && current_hour<=20) && (current_minute==00 || current_minute ==30) && !statut_pn && current_secondes<30){
		eteindretout();
		allumer(pere_noel());
		allumer(proj());
		statut_pn = true;
		console.log('Allumage pere noel');
		timer = 0;
	}
	timer = timer+1;
	if(timer>34 && statut_pn){
		console.log('Extinction pere noel');
		statut_pn = false;
		extinction(pere_noel());
	}
	if(statut_pn){
		sleep.sleep(1);
		continue;
	}



	//LIGHT
	if(current_day != 24){
		if(current_hour>=7 && current_hour<=11 ) {
			allumer(guir_neige());
			allumer(proj());
			console.log('Allumage simple 7-10h');  
		} else if(current_hour>11 && current_hour<=13 ) {
			allumer(guir_flash());
			extinction(proj());
			extinction(guir_neige());
			console.log('Allumage Flash 10h-18h');
		} else if(current_hour>=14 && current_hour<22 ) {
			console.log('Allumage soir')
			var rdn = Math.floor(random(1,5));
			console.log("re"+rdn);
			if(rdn == 1)
				allumer(guir_neige());
			else
				extinction(guir_neige());
			allumer(guir_flash());
			allumer(proj());
		}else{
			eteindretout();
			console.log('OFF');
		}
	}else{
		console.log('NOEL - MARCHE FORCEE');

		if(current_hour>=12 && current_hour<14 ) {
			allumer(guir_flash());
			extinction(proj());
			extinction(guir_neige());
		} else if(current_hour>=14 && current_hour<18 ) {
			console.log('Allumage aprem 14-18');
			allumer(guir_flash());
			allumer(guir_neige());
			allumer(proj());
		}else if(current_hour>=18 && current_hour<20){
			console.log('18-20h');
			extinction(guir_flash());
			allumer(guir_neige());
			allumer(proj());
		}else if(current_hour>=20){
			allumertoutlight();
		}
		else{
			eteindretout();
			console.log('OFF');
		}



	}


	sleep.sleep(1);
}




