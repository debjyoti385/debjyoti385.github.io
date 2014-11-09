		
		var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Map data &copy; 2014 OpenStreetMap contributors, Imagery &copy; 2014 debjyotipaul.in',
			cloudmade = L.tileLayer(cloudmadeUrl, {maxZoom: 19, attribution: cloudmadeAttribution});

		var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
				attribution: '',
				maxZoom: 18
			});
		var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
				attribution: '',
				maxZoom: 18
			});
		var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: '',
				maxZoom: 18
			});

		var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
				attribution: '',
				maxZoom: 18
			});


		var map = new L.Map('map', {
			layers: [cloudmade, Esri_WorldTopoMap,Esri_WorldStreetMap,Esri_WorldImagery,OpenStreetMap_BlackAndWhite],
			center: new L.LatLng(28.64, 77.23),
			zoom: 10,
			fullscreenControl: true,
			fullscreenControlOptions: { // optional
				title:"Show me the fullscreen !"
			}
		});

		var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left'
        });
        map.addControl(sidebar);

		var MyIcon = L.Icon.extend({
			options: {
				// shadowUrl: 'images/leaf-shadow.png',
				iconSize:     [38, 38],
				// shadowSize:   [50, 64],
				iconAnchor:   [19, 19],
				// shadowAnchor: [4, 62],
				popupAnchor:  [-10, -50]
			}
		});

		var greenIcon = new MyIcon({iconUrl: 'images/leaf-green.png'}),
			blueIcon = new MyIcon({iconUrl: 'images/pin_blue.png'}),
			blackInside = new MyIcon({iconUrl: 'images/marker_icon/blackInside.png'}),
			blackInsideGreen = new MyIcon({iconUrl: 'images/marker_icon/blackInsideGreen.png'}),
			blueBall = new MyIcon({iconUrl: 'images/marker_icon/blueBall.png'}),
			blueBallPin = new MyIcon({iconUrl: 'images/marker_icon/blueBallPin.png'}),
			blueBubble = new MyIcon({iconUrl: 'images/marker_icon/blueBubble.png'}),
			blueDrawPin = new MyIcon({iconUrl: 'images/marker_icon/blueDrawPin.png'}),
			blueFlagCurl = new MyIcon({iconUrl: 'images/marker_icon/blueFlagCurl.png'}),
			blueInside = new MyIcon({iconUrl: 'images/marker_icon/blueInside.png'}),
			bluePin = new MyIcon({iconUrl: 'images/marker_icon/bluePin.png'}),
			bluePushPin = new MyIcon({iconUrl: 'images/marker_icon/bluePushPin.png'}),
			boardGreenPin = new MyIcon({iconUrl: 'images/marker_icon/boardGreenPin.png'}),
			boardPin = new MyIcon({iconUrl: 'images/marker_icon/boardPin.png'}),
			boardPinPink = new MyIcon({iconUrl: 'images/marker_icon/boardPinPink.png'}),
			greeFlagCurl = new MyIcon({iconUrl: 'images/marker_icon/greeFlagCurl.png'}),
			greenBall = new MyIcon({iconUrl: 'images/marker_icon/greenBall.png'}),
			greenBallPin = new MyIcon({iconUrl: 'images/marker_icon/greenBallPin.png'}),
			greenBubble = new MyIcon({iconUrl: 'images/marker_icon/greenBubble.png'}),
			greenDrawing = new MyIcon({iconUrl: 'images/marker_icon/greenDrawing.png'}),
			greenFlag = new MyIcon({iconUrl: 'images/marker_icon/greenFlag.png'}),
			greenFlagCheq = new MyIcon({iconUrl: 'images/marker_icon/greenFlagCheq.png'}),
			greenInside = new MyIcon({iconUrl: 'images/marker_icon/greenInside.png'}),
			greenPin = new MyIcon({iconUrl: 'images/marker_icon/greenPin.png'}),
			pinkBallPin = new MyIcon({iconUrl: 'images/marker_icon/pinkBallPin.png'}),
			pinkFlag = new MyIcon({iconUrl: 'images/marker_icon/pinkFlag.png'}),
			pinkFlagCurl = new MyIcon({iconUrl: 'images/marker_icon/pinkFlagCurl.png'}),
			pinkFlagRight = new MyIcon({iconUrl: 'images/marker_icon/pinkFlagRight.png'}),
			pinkInside = new MyIcon({iconUrl: 'images/marker_icon/pinkInside.png'}),
			pinkPin = new MyIcon({iconUrl: 'images/marker_icon/pinkPin.png'}),
			pinkPushPin = new MyIcon({iconUrl: 'images/marker_icon/pinkPushPin.png'}),
			smallPinkFlag = new MyIcon({iconUrl: 'images/marker_icon/smallPinkFlag.png'}),
			pinkIcon = new MyIcon({iconUrl: 'images/pink.png'});

		var newsLayer = L.markerClusterGroup(),
			ReligiousNews = L.markerClusterGroup(),
			WaterNews = L.markerClusterGroup(),
			SportsNews = L.markerClusterGroup(),
			WomenIssues = L.markerClusterGroup(),
			Agriculture = L.markerClusterGroup(),
			Education = L.markerClusterGroup(),
			Industry = L.markerClusterGroup(),
			WeatherNews = L.markerClusterGroup(),
			PollutionEnvironment = L.markerClusterGroup(),
			Events = L.markerClusterGroup(),
			AccidentCalamity = L.markerClusterGroup(),
			TransportNews = L.markerClusterGroup(),
			Culture = L.markerClusterGroup(),
			ElectricityLighting = L.markerClusterGroup(),
			Crime = L.markerClusterGroup(),
			Political = L.markerClusterGroup(),
			Governance = L.markerClusterGroup(),
			SocialIssues = L.markerClusterGroup(),
			HealthHospital = L.markerClusterGroup(),
			Development = L.markerClusterGroup(),
			Others = L.markerClusterGroup();

		var markers = [];		
		for (var i = 0; i < addressPoints.length ; i++) {
			var a = addressPoints[i];
			var title = eval('('+ a[2] +')');
			var marker = new MyCustomMarker(new L.LatLng(a[0], a[1]), { icon: boardPin, title: title });
			marker.bindPopup( "<div id='cssmenu' style='width: 200px;background: #555;margin-top:0.5cm;'> <ul>  <li class='has-sub'><a href='#'><span>"+title.heading+"</span></a> <ul  > <li>LOCATION: " + a[0]+ " "+ a[1] +" <li>"+ title.contents+"</li>  </ul> </li><a href='"+title.link+"' target='_blank'><span id='category' style='display:none;'>"+title.category+"</span><span style='display:none; font-family:\"Playball\", cursive;font-size: 14px;color: #052A0A;'>   "+title.link+"</span></a>  </div>", {
            	showOnMouseOver: true
       	 	});
       	 	markers.push(marker);

       	 	switch(title.category){
					case 'ReligiousNews': ReligiousNews.addLayer(marker); break;
					case 'WaterNews': WaterNews.addLayer(marker); break;
					case 'SportsNews': SportsNews.addLayer(marker); break;
					case 'WomenIssues': WomenIssues.addLayer(marker); break;
					case 'Agriculture': Agriculture.addLayer(marker); break;
					case 'Education': Education.addLayer(marker); break;
					case 'Industry': Industry.addLayer(marker); break;
					case 'WeatherNews': WeatherNews.addLayer(marker); break;
					case 'PollutionEnvironment': PollutionEnvironment.addLayer(marker); break;
					case 'Events': Events.addLayer(marker); break;
					case 'AccidentCalamity': AccidentCalamity.addLayer(marker); break;
					case 'TransportNews': TransportNews.addLayer(marker); break;
					case 'Culture': Culture.addLayer(marker); break;
					case 'ElectricityLighting': ElectricityLighting.addLayer(marker); break;
					case 'Crime': Crime.addLayer(marker); break;
					case 'Political': Political.addLayer(marker); break;
					case 'Governance': Governance.addLayer(marker); break;
					case 'SocialIssues': SocialIssues.addLayer(marker); break;
					case 'HealthHospital': HealthHospital.addLayer(marker); break;
					case 'Development': Development.addLayer(marker); break;
					default: marker.setIcon(blueInside); Others.addLayer(marker); break;
       	 	}
			// newsLayer.addLayer(marker);
		}
		// map.addLayer(newsLayer);
		map.addLayer(ReligiousNews);
		map.addLayer(WaterNews);
		map.addLayer(SportsNews);
		map.addLayer(WomenIssues);
		map.addLayer(Agriculture);
		map.addLayer(Education);
		map.addLayer(Industry);
		map.addLayer(WeatherNews);
		map.addLayer(PollutionEnvironment);
		map.addLayer(Events);
		map.addLayer(AccidentCalamity);
		map.addLayer(TransportNews);
		map.addLayer(Culture);
		map.addLayer(ElectricityLighting);
		map.addLayer(Crime);
		map.addLayer(Political);
		map.addLayer(Governance);
		map.addLayer(SocialIssues);
		map.addLayer(HealthHospital);
		map.addLayer(Development);
		map.addLayer(Others);

		// var newsLayer2 = L.markerClusterGroup();
		// for (var i = addressPoints.length - 1000 ; i < addressPoints.length; i++) {
		// 	var a = addressPoints[i];
		// 	var title = eval('('+ a[2] +')');
		// 	var marker = new MyCustomMarker(new L.LatLng(a[0], a[1]), { icon: blueBall, title: title });
		// 	marker.bindPopup( "<div id='cssmenu' style='width: 200px;background: #555;margin-top:0.5cm;'> <ul>  <li class='has-sub'><a href='#'><span>"+title.heading+"</span></a> <ul  > <li>LOCATION: " + a[0]+ " "+ a[1] +"</li><li>"+ title.contents+"</li>  </ul> </li> <li class='has-sub' style='display:none;'><a href='#'><span>Link</span></a> <ul> <li><a href='"+title.link+"' target='_blank'><span>"+title.link+"</span></a></li> </ul> </li> </ul> </div>", {
  //           	showOnMouseOver: true
  //      	 	});
  //      	 	markers.push(marker);
		// 	newsLayer2.addLayer(marker);
		// }
		// map.addLayer(newsLayer2);



		var baseMaps = {
			// "Imagery" : Esri_WorldImagery,
		    "WorldStreet": Esri_WorldStreetMap,
		    "TopoMap": Esri_WorldTopoMap,
		    "BlackWhite" : OpenStreetMap_BlackAndWhite,
		    "Cloudmade" : cloudmade
		};

		var overlayMaps = {
		    // "News": newsLayer,
		    "ReligiousNews":ReligiousNews,
			"WaterNews":WaterNews,
			"SportsNews":SportsNews,
			"WomenIssues":WomenIssues,
			"Agriculture":Agriculture,
			"Education":Education,
			"Industry":Industry,
			"WeatherNews":WeatherNews,
			"PollutionEnvironment":PollutionEnvironment,
			"Events":Events,
			"AccidentCalamity":AccidentCalamity,
			"TransportNews":TransportNews,
			"Culture":Culture,
			"ElectricityLighting":ElectricityLighting,
			"Crime":Crime,
			"Political":Political,
			"Governance":Governance,
			"SocialIssues":SocialIssues,
			"HealthHospital":HealthHospital,
			"Development":Development,
			"Others":Others
		};

		var control = L.control.activeLayers(baseMaps, overlayMaps);
		control.addTo(map);

		map.removeLayer(Esri_WorldStreetMap);
		map.removeLayer(OpenStreetMap_BlackAndWhite);
		map.removeLayer(cloudmade);

		map.removeLayer(ReligiousNews);
		map.removeLayer(WaterNews);
		map.removeLayer(SportsNews);
		map.removeLayer(WomenIssues);
		map.removeLayer(Agriculture);
		map.removeLayer(Education);
		map.removeLayer(Industry);
		map.removeLayer(WeatherNews);
		map.removeLayer(PollutionEnvironment);
		map.removeLayer(Events);
		map.removeLayer(AccidentCalamity);
		map.removeLayer(TransportNews);
		map.removeLayer(Culture);
		map.removeLayer(ElectricityLighting);
		// map.removeLayer(Crime);
		map.removeLayer(Political);
		map.removeLayer(Governance);
		map.removeLayer(SocialIssues);
		map.removeLayer(HealthHospital);
		map.removeLayer(Development);
		map.removeLayer(Others);


		map.on('popupopen', function(e) {
  			var marker = e.popup._source;
  			// window.console.log(marker._popup.getContent());  			
  			

  			// sidebar.hide();
  			setTimeout(function () {
  				var str = marker._popup.getContent();
	            str = str.replace("style='width: 200px;background: #555;","style='width: 400px;background: #fff;");
	            str = str.replace("display:none; ","display:block; ");
  				sidebar.setContent(str);
    	        sidebar.show();
    	        // prepareMenu();
	        }, 1000);
  			
  			setTimeout(function(){
  				prepareMenu();
  			},1500);
		});

        map.on('click', function () {
        	// rightSidebar.toggle();
            sidebar.hide();
        })

        sidebar.on('show', function () {
            console.log('Sidebar visible.');
        });

        sidebar.on('hide', function () {
            console.log('Sidebar hidden.');
        });

        L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
            console.log('Close button clicked.');
        });

		// detect fullscreen toggling
		map.on('enterFullscreen', function(){
			if(window.console) window.console.log('enterFullscreen');
		});
		map.on('exitFullscreen', function(){
			if(window.console) window.console.log('exitFullscreen');
		});

		Array.prototype.contains = function(obj) {
		    var i = this.length;
		    while (i--) {
		        if (this[i] === obj) {
		            return true;
		        }
		    }
		    return false;
		}

		map.on('move', function() {
	            // construct an empty list to fill with onscreen markers
	            var inBounds = [],
	            // get the map bounds - the top-left and bottom-right locations
	            bounds = map.getBounds();

	            // for each marker, consider whether it is currently visible by comparing
	            // with the current map bounds

	            for (var i = 0, len = markers.length; i < len; i++) {
	                var marker = markers[i];
	                if (bounds.contains(marker.getLatLng())) {
	                	var str = marker._popup.getContent();
	                	var $jQueryObject = $($.parseHTML(str));
	                	var cat = $jQueryObject.find("#category").html();
	                	// $jQueryObject.find("#category").html();
	                	var overlayLayers = control.getActiveOverlayLayers();
	                	var activeLayerNames = [];
	                	for ( var overlayId in overlayLayers){
	                		if(overlayLayers[overlayId].name == cat){
		                		str = str.replace("style='width: 200px;background: #555;","style='width: 400px;background: #fff;");
			                	str = str.replace("display:none; ","display:block; ");
			                    inBounds.push(str);	
			                    break;
	                		}
	                	}
	                	// if(activeLayerNames.contains($jQueryObject.find("#category").html())){
	                	// 	str = str.replace("style='width: 200px;background: #555;","style='width: 400px;background: #fff;");
		                // 	str = str.replace("display:none; ","display:block; ");
		                //     inBounds.push(str);	
	                	// }	                	
	                    // console.log(marker.options.title);
	                }
	            }

	            if(inBounds.length < 100){
	            // display a list of markers.

	            sidebar.setContent(inBounds.join('<br>\n'));
	            prepareMenu();
	        }
	    });


