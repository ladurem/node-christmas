node-christmas
==============

Petit code nodejs afin de gerer les GPIO d'un raspberry pi et allumer un sapin de noel

Définition des GPIO :
var gpio_num = [25,11,8,7];

Pour ma part, 4 relais sont utilisés.


Installation :
Dans le repertoire de l'application :

npm install -g node-gyp

Ensuite, compilez le package :

node-gyp rebuild
	
	Le script se décompose en deux parties : 
	  app.js 
	  S'execute chaque seconde avec un programme d'allumage automatique en fonction des horaires
	  app_web.js
	  Lance un serveur web sur le port 81, avec une interface avec boostrap et jQuery pour controler les GPIOs
