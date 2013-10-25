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


