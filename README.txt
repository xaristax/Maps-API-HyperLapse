/*
Example

Creation of a map in any element:

$("div").mapa();

Options:

rol: you can establish only the function of map putting the text "mapa" or if you want to use it to 
directions you can use "busqueda"
width : establish the width of the map
height: establish the height of the map
zoom: establish the zoom level in google maps
longitud: the longitude in the map
latitud: the latitud on the map

mascara: This options work in the busqueda mode so the second input can work as a place but if we dont wanna show the
address we put the mascara
EXAMPLE: $("div").mapa({lock2:true,addr2:'Colina de jades 1 col boulevares naucalpan',mascara:'IM SHOWING THIS TEXT ON THE SECOND INPUT'});

addr1: sets the direction on the first input
addr2: sets the direction on the second input

lock1: disable the entry of text on the first input
lock2: disable the entry of text on the second input

mascara: sets a mask on the second input
loaderIMG: sets the root of the loading image to be use while loading the hyperlapse image

videoActivo: sets to be true if we want hyperlapse (default:false)
videoVelocidad: the ms of on each image (default: 100)
videoDistancia: how many frames we want on our hyperlapse (default:5)
videoAutoplay: if the video start inmediatly the route is draw
videoPauseIMG: sets the root of the pause bottom image
videoPlayIMG: sets the root of the play bottom image
videoStopIMG: sets the root of the stop bottom image

methods

agregarPunto: adds a new location on the map

options

latitud: set the latitud of the new point
longitud: set the longitude of the new point
icono: set the root of the image to be use as the icon of the point
animado: animates the place to be bouncing


BIG EXAMPLE:

$(document).ready(function(){
var lat = 19.4969617;
var lon =  -99.2434079;
var $mapaShow = $("#mapa");
	$mapaShow.mapa({rol:'busqueda',
		width:$(document).width() -5,
		height:$(document).height() -5,
		zoom:14,
		longitud:lon,
		latitud:lat,
		mascara:'Colegio La Salle Boulevares',
		'addr2':'Colina de jades 1 col boulevares naucalpan',
		lock2:true,
		loaderIMG:'img/loader.gif',
		videoActivo : true,
		videoVelocidad: 200,
		videoDistancia : 5,
		videoAutoplay : true,
		videoPausaIMG : 'img/pausa.png',
		videoPlayIMG : 'img/play.png',
		videoStopIMG : 'img/stop.png'
	});
	
	$mapaShow.agregarPunto({latitud:lat,
		longitud:lon,
		icono:'img/logo.png',
		animado:true
	});
});



*/





