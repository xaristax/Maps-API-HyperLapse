//EJEMPLO

$(document).ready(function(){
var lat = 19.4969617;
var lon =  -99.2434079;
var $mapaShow = $("#mapa");
	$mapaShow.mapa({rol:'busqueda',
		width:$(document).width(), 
		height:$(document).height(),
		zoom:14,
		longitud:lon,
		latitud:lat,
		mascara:'Colegio La Salle Boulevares',
		'addr2':'Colina de jades 1 col boulevares naucalpan',
		lock2:true,
		loaderIMG:'img/loader.gif',
			'video':{'activo':true,
			'velocidad':200,
			'distancia':5,
			'autoplay' : true,
			'pausaIMG' : 'img/pausa.png',
			'playIMG' : 'img/play.png',
			'stopIMG' : 'img/stop.png'
			}
	});
	
	$mapaShow.agregarPunto({latitud:lat,
		longitud:lon,
		icono:'img/logo.png',
		animado:true
	});
});


