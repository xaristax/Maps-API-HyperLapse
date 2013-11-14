/*
Autor: Arturo Arista R. (xaristax)
Fecha: 2013
Licencia: GNU General Public License
*/

(function($){
	$.fn.extend({
		mapa : function(parametros){
			var variables = {
			'rol': 'mapa',
			'tipo' : 'normal',
			'animado' : false,
			'icono' :  '',
			'zoom' : 15,
			'titulo': 'Inicio',
			'latitud' : 19.440755,
			'longitud' : -99.141483,
			'width' : 800,
			'height' : 600,
			'addr1' : '',
			'addr2' : '',
			'mascara' : '',
			'lock1' : false,
			'lock2' : false,
			'loaderIMG' : 'loader.gif',
			'videoActivo' :false,
			'videoVelocidad':100,
			'videoDistancia':5,
			'videoAutoplay':false,
			'videoPausaIMG':false,
			'videoPlayIMG':false,
			'videoStopIMG':false
			}
		var param = $.extend(variables,parametros);
		var $elemento = $(this);
		var hyperlapse;
		$elemento.css({position:'relative',width:param.width,height:param.height,'border':'solid 2px #6b6b6b'});
		var $contenedor = $("<div id='contenedorMapa' />");
			switch(param.tipo){
			case 'hibrido' : param.tipo = google.maps.MapTypeId.HYBRID;
			break;
			case 'normal' : param.tipo = google.maps.MapTypeId.ROADMAP;
			break;
			case 'satelite' : param.tipo = google.maps.MapTypeId.SATELLITE;
			break;
			case 'relieve' : param.tipo = google.maps.MapTypeId.TERRAIN;
			break;
			default : param.tipo = google.maps.MapTypeId.ROADMAP;
			break;
			}
			//VARIABLES GLOBALES
			var directionDisplay;
			var directionsService = new google.maps.DirectionsService();
			//VARIABLES GLOBALES
			switch(param.rol){
			case 'mapa' :
			$contenedor.css({'width':'100%','height':'100%','float':'left'});
			$elemento.append($contenedor);
			mapa();
			break;
			case 'busqueda' :
			$contenedor.css({'width':'60%','height':'100%','float':'left'});
			var keyLock1 = "";
			var keyLock2 = "";
			if(param.lock1){
			keyLock1 = "disabled='disabled'";
			}
			if(param.lock2){
			keyLock2 = "disabled='disabled'";
			}
			var $pasos = $("<div id='pasosMapa'><input id='puntoA' type='text' value='"+param.addr1+"' "+keyLock1+" /><input id='puntoB' type='text' value='"+param.mascara+"' name='"+param.addr2+"' "+keyLock2+" /><input id='buscarRuta' type='button' value='Buscar Ruta' /></div>");
			var $loader = $("<div id='loaderMAPSX' style='position:absolute;bottom:15px;right:10px;z-index:9;display:none' ><img src='"+param.loaderIMG+"' />'</div>");
			var $pano = $("<div id='pano' style='position:absolute;z-index:10;display:none'><div id='controlesMAPSX' style='position:absolute;bottom:10px;right:5px'><img id='pausaBTNMAPSX' style='width:25px;margin-right:5px;cursor:pointer' src='"+param.videoPausaIMG+"' /><img id='playBTNMAPSX' style='width:25px;margin-right:5px;cursor:pointer' src='"+param.videoPlayIMG+"' /><img id='stopBTNMAPSX' style='width:25px;margin-right:5px;cursor:pointer' src='"+param.videoStopIMG+"' /></div></div>");
			$pasos.find("input[type='text']").css({'width':'80%','display':'block','margin':'10px auto','padding':5});
			$pasos.find("input[type='button']").css({'width':'50%','display':'block','margin':'5px auto','color':'#FFF','backgroundColor':'#4387f4','border':'solid 2px #43a3f4'});
			$pasos.css({'width':'40%','height':'100%','backgroundColor':'#efefef','float':'left',overflow:'auto'});
			$elemento.append($pasos);
			$elemento.append($contenedor);
			$elemento.prepend($pano);
			$elemento.prepend($loader);
		$("#buscarRuta").bind('click',calcularRuta);
		$("#pausaBTNMAPSX").bind('click',function(){
		hyperlapse.pause();
		});
		$("#playBTNMAPSX").bind('click',function(){
		hyperlapse.play();
		});
		$("#stopBTNMAPSX").bind('click',function(){
		hyperlapse.pause();
			$pano.animate({opacity:0},500,function(){
			$pano.css('display','none');
			});
		});
			busqueda();
			break;
			}

		function mapa() {
		latlng  = new google.maps.LatLng(param.latitud,param.longitud)
		var mapOptions = {
		center: latlng,
		zoom: param.zoom,
		mapTypeId: param.tipo
		};
		map = new google.maps.Map(document.getElementById('contenedorMapa'),
		mapOptions);
			if(param.animado){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}
		
		
		function busqueda(){
		latlng  = new google.maps.LatLng(param.latitud,param.longitud)
		directionsDisplay = new google.maps.DirectionsRenderer();
		var mapOptions = {
		center: new google.maps.LatLng(param.latitud,param.longitud),
		zoom: param.zoom,
		mapTypeId: param.tipo
		};
		map = new google.maps.Map(document.getElementById('contenedorMapa'),
		mapOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('pasosMapa'));
		var input = document.getElementById('puntoA');
		var autocomplete = new google.maps.places.Autocomplete(input);
		var input2 = document.getElementById('puntoB');
		var autocomplete = new google.maps.places.Autocomplete(input2);
		autocomplete.bindTo('bounds', map);
		var infowindow = new google.maps.InfoWindow();
			if(param.animado){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}
	
		//FUNCION CALCULAR RUTA
		function calcularRuta() {
		var ALAT;
		var ALON;
		var BLAT;
		var BLON;
		var start = document.getElementById('puntoA').value;
		var end = document.getElementById('puntoB').getAttribute('name');
			var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
				ALAT = response.routes[0].legs[0].start_location.ob;
				ALON = response.routes[0].legs[0].start_location.pb;
				BLAT = response.routes[0].legs[0].end_location.ob;
				BLON = response.routes[0].legs[0].end_location.pb;
					if(param.videoActivo === true){
						$loader.css('display','block');
						if($("#loaderMAPSX").length > 0){
						$loader.html("<img src='"+param.loaderIMG+"' />");
						}
						if($pano.find("canvas").length > 0){
						hyperlapse.reset();
						$pano.find("canvas").remove();
						}
						hyper(ALAT,ALON,BLAT,BLON);
					}
				directionsDisplay.setDirections(response);
				}
				else{
				alert('Complete todos los campos o verifique su ruta');
				}
			});
		}
		//FUNCION CALCULAR RUTA
		
		//FUNCION HYPERLAPSE
		function hyper(ALAT,ALON,BLAT,BLON){
		hyperlapse = new Hyperlapse(document.getElementById('pano'), {
				lookat: new google.maps.LatLng(BLAT,BLON),
				zoom: 1,
				width:param.width,
				height:param.height,
				use_lookat: false,
				elevation: 50,
				distance_between_points:param.videoDistancia,
				millis:param.videoVelocidad
			});
			
			hyperlapse.onError = function(e) {
				alert('Su navegador no permite mostrar el modo video');
			};

			hyperlapse.onRouteComplete = function(e) {
				hyperlapse.load();
			};

			hyperlapse.onLoadComplete = function(e) {
				$loader.html("<input id='videoBTNMAPSX' type='button' value='Ver Video' />");
				$loader.find("input[type='button']").css({'display':'block','margin':'5px auto','color':'#FFF','backgroundColor':'#4387f4','border':'solid 2px #43a3f4'});
					if(param.videoAutoplay === true){
					$pano.css({'display':'block',opacity:0});
					$pano.animate({opacity:1},500);
					}
				$loader.find("input[type='button']").bind("click",function(){
				$pano.css({'display':'block',opacity:0});
				$pano.animate({opacity:1},500);
				});
			};
			var directions_service = new google.maps.DirectionsService();
			var route = {
				request:{
					origin: new google.maps.LatLng(ALAT,ALON),
					destination: new google.maps.LatLng(BLAT,BLON),
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				}
			};

			directions_service.route(route.request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					hyperlapse.generate( {route:response} );
				} else {
					console.log(status);
				}
			});
		}
		//FUNCION HYPERLAPSE
		
		}
	});
	
	$.fn.extend({
		agregarPunto : function(parametros){
		var variables = {
		'latitud': 19.442536,
		'longitud': -99.14291,
		'animado' : false,
		'icono' : '',
		'titulo' : 'Marcador'
		}
		var param = $.extend(variables,parametros)
		var newlatlng  = new google.maps.LatLng(param.latitud,param.longitud)
		var marker = new google.maps.Marker({
        position: newlatlng,
        map: map,
		icon: param.icono,
        title: param.titulo
        });
			if(param.animado){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}
	});
	
})(jQuery);
