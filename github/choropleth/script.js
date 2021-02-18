/*globals d3, topojson, document*/
// These are helpers for those using JSHint
var data,
    locationData,
    teamSchedules,
    selectedSeries,
	selected_pollutant,
    colorScale,
	city

		selected_pollutant = "81102-86502";
		city = ""


colorScale = d3.scale.quantize()
	.domain([0, 51, 101, 151, 201, 301])
	//.range(["red","green","blue","yellow","black"]);
	.range(["#00FF00","#FFD700","#FF8C00","#FF0000","#C71585","#80080"]);
//console.log("color:", colorScale(40));
//console.log("color:", colorScale(10));
$(document).ready(function() {
    $('#p_all').click(function(e) {  
      selected_pollutant="";
		changeSelection();
    });
    $('#p_o3').click(function(e) {  
      selected_pollutant="44201";
		changeSelection();
    });
    $('#p_no2').click(function(e) {  
      selected_pollutant="42602";
		changeSelection();
    });
    $('#p_so2').click(function(e) {  
      selected_pollutant="42401";
		changeSelection();
    });
    $('#p_co').click(function(e) {  
      selected_pollutant="42101";
		changeSelection();
    });
    $('#p_pm2_5').click(function(e) {  
      selected_pollutant="88101-88502";
		changeSelection();
    });
    $('#p_pm10').click(function(e) {  
      selected_pollutant="81102-86502";
		changeSelection();
    });
});





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function o3Aqi(avg_mean){
	
	if(0.0<avg_mean && avg_mean <= 0.065){
		Ihi =50;
		Ilo=0;
		BPhi = 0.064;
		BPlo = 0.0;
			
	}else if(0.065<avg_mean && avg_mean<=0.085){
		Ihi =100;
		Ilo=51;
		BPhi = 0.084;
		BPlo = 0.065;
		
	}else if(0.085<avg_mean && avg_mean<=0.105){
		Ihi =150;
		Ilo=101;
		BPhi = 0.104;
		BPlo = 0.085;
		
	}else if(0.105<avg_mean && avg_mean<=0.125){
		Ihi = 200;
		Ilo=151;
		BPhi = 0.124;
		BPlo = 0.105;
		
	}else if(0.125<avg_mean && avg_mean<=0.375){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 300;
		BPlo = 201;
		
	}else{
		return getRandomInt(1, 500);
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}

function pm10Aqi(avg_mean){

	if(0<avg_mean && avg_mean<=55){
		Ihi =500;
		Ilo=0;
		BPhi = 54;
		BPlo = 0;
			
	}else if(55<avg_mean && avg_mean<=155){
		Ihi =100;
		Ilo=51;
		BPhi = 154;
		BPlo = 55;
		
	}else if(155<avg_mean && avg_mean<=255){
		Ihi =150;
		Ilo=101;
		BPhi = 254;
		BPlo = 155;
		
	}else if(255<avg_mean && avg_mean<=355){
		Ihi = 200;
		Ilo=151;
		BPhi = 354;
		BPlo = 255;
		
	}else if(355<avg_mean && avg_mean<=425){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 424;
		BPlo = 355;
		
	}else if(425<avg_mean && avg_mean<=505){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 504;
		BPlo = 425;
	
	}else if(505<avg_mean && avg_mean<=605){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 604;
		BPlo = 505;
	}else{
		return getRandomInt(1, 500);
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}

function pm25Aqi(avg_mean){
	if(0.0<avg_mean && avg_mean<=15.5){
		Ihi =50;
		Ilo=0;
		BPhi = 15.4;
		BPlo = 0.0;
			
	}else if(15.5<avg_mean && avg_mean<=40.5){
		Ihi =100;
		Ilo=51;
		BPhi = 40.4;
		BPlo = 15.5;
		
	}else if(40.5<avg_mean && avg_mean<=65.5){
		Ihi =150;
		Ilo=101;
		BPhi = 65.4;
		BPlo = 40.5;
		
	}else if(65.5<avg_mean && avg_mean<=150.5){
		Ihi = 200;
		Ilo=151;
		BPhi = 150.4;
		BPlo = 65.5;
		
	}else if(150.5<avg_mean && avg_mean<=250.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 250.4;
		BPlo = 150.5;
		
	}else if(250.5<avg_mean && avg_mean<=350.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 350.4;
		BPlo = 250.5;
		
	}else if(350.5<avg_mean && avg_mean<=500.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 350.5;
		BPlo = 500.4;
	}else{
		return getRandomInt(1, 500);
	}	
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}

function coAqi(avg_mean){
	if(0.0<avg_mean && avg_mean<=4.5){
		Ihi =50;
		Ilo=0;
		BPhi = 4.4;
		BPlo = 0.0;
			
	}else if(4.5<avg_mean && avg_mean<=9.5){
		Ihi =100;
		Ilo=51;
		BPhi = 9.4;
		BPlo = 4.5;
		
	}else if(9.5<avg_mean && avg_mean<=12.5){
		Ihi =150;
		Ilo=101;
		BPhi = 12.4;
		BPlo = 9.5;
		
	}else if(12.5<avg_mean && avg_mean<=15.5){
		Ihi = 200;
		Ilo=151;
		BPhi = 15.4;
		BPlo = 12.5;
		
	}else if(15.5<avg_mean && avg_mean<=30.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 30.4;
		BPlo = 15.5;
		
	}else if(30.5<avg_mean && avg_mean<=40.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 40.4;
		BPlo = 30.5;
	}else if(40.5<avg_mean && avg_mean<=50.5){
		Ihi =0.374;
		Ilo=0.125;
		BPhi = 50.4;
		BPlo = 40.5;
		
	}else{
		return getRandomInt(1, 500);
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}
function so2Aqi(avg_mean){
	avg_mean = avg_mean/1000;
	if(0.0<avg_mean && avg_mean<=0.035){
		Ihi =50;
		Ilo=0;
		BPhi = 0.034;
		BPlo = 0.0;
			
	}else if(0.035<avg_mean && avg_mean<=0.145){
		Ihi =100;
		Ilo=51;
		BPhi = 0.144;
		BPlo = 0.035;
		
	}else if(0.145<avg_mean && avg_mean<=0.225){
		Ihi =150;
		Ilo=101;
		BPhi = 0.224;
		BPlo = 0.145;
		
	}else if(0.225<avg_mean && avg_mean<=0.305){
		Ihi = 200;
		Ilo=151;
		BPhi = 0.304;
		BPlo = 0.225;
		
	}else if(0.305<avg_mean && avg_mean<=0.605){
		Ihi =300;
		Ilo=201;
		BPhi = 0.604;
		BPlo = 0.305;
		
	}else if(0.605<avg_mean && avg_mean<=0.805){
		Ihi =400;
		Ilo=301;
		BPhi = 0.804;
		BPlo = 0.605;
	}else if(0.805<avg_mean && avg_mean<=0.1005){
		Ihi =500;
		Ilo=401;
		BPhi = 0.1004;
		BPlo = 0.805;
		
	}else{
		return getRandomInt(1, 500);
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}
function no2Aqi(avg_mean){
	avg_mean = avg_mean/1000;
	if(0.65<avg_mean && avg_mean<=0.125){
		Ihi =300;
		Ilo=201;
		BPhi = 0.124;
		BPlo = 0.65;
			
	}else if(1.25<avg_mean && avg_mean<=1.65){
		Ihi =400;
		Ilo=301;
		BPhi = 1.64;
		BPlo = 0.65;
		
	}else if(1.65<avg_mean && avg_mean<=2.05){
		Ihi =500;
		Ilo=401;
		BPhi = 2.04;
		BPlo = 1.65;
		
	}else{
		return getRandomInt(201, 500);
	}
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo;
}


function calcAqi(avg_mean, parameter){
	if(parameter === ""){
		return pm25Aqi(avg_mean);
		/*o3AqI = o3Aqi(avg_mean);
		so2AqI = so2Aqi(avg_mean);
		no2AqI=no2Aqi(avg_mean);
		coAqI = coAqi(avg_mean);
		pm25AqI = pm25Aqi(avg_mean);
		pm10AqI = pm10Aqi(avg_mean);
		aqI = Math.max(pm25AqI,pm10AqI,coAqI,no2AqI,so2AqI,o3AqI);*/
	}else if(parameter === "44201"){
		aqI = o3Aqi(avg_mean);
	}else if(parameter === "88101-88502"){
		aqI = pm25Aqi(avg_mean);
	}else if(parameter === "81102-86502"){
		aqI = pm10Aqi(avg_mean);
	}else if(parameter === "42401"){
		aqI = so2Aqi(avg_mean);
	}else if(parameter === "42101"){
		aqi = coAqi(avg_mean);
	}else if(parameter === "42602"){
		aqI = no2Aqi(avg_mean);
	}
	return aqI;
	
}









/* EVENT RESPONSE FUNCTIONS */

function setHover(d) {
    // There are FOUR data_types that can be hovered;
    // nothing (null), a single Game, a Team, or
    // a Location
   var displayitem = "";
   if(d == null) 
	{
		displayitem = "";
	}
	else{ 
	
	if(d.data_type == "Game")
	{
		displayitem = d["Visit Team Name"] + "@" + d["Home Team Name"];
	}
	else if(d.data_type == "Team")
	{
		displayitem = d["name"];
	}
	else if (d.data_type == "Location") 
	{
		var games = d["games"];
		//console.log("games length", games.length);
		if(games.length > 0)
		{
			displayitem = displayitem + games[0]["Visit Team Name"] + "@" + games[0]["Home Team Name"];
		
			for(var j = 1; j < games.length; j++)
			{	    	
				displayitem =  displayitem + ", ";    		
    			displayitem = displayitem + games[j]["Visit Team Name"] + "@" + games[j]["Home Team Name"];
    		}
    	}
    	else {
    	displayitem = "";
		}
	}
	   // ******* TODO: PART V *******
	}
	document.getElementById("info").innerHTML = displayitem;
}

function clearHover() {
    setHover(null);
}

function changeSelection(d) {
    // There are FOUR data_types that can be selected;
    // an empty selection (null), a single Game,
    // a Team, or a Location.
	
    // ******* TODO: PART V *******
   updateGoogleMap();
   updateBarChart();
}
/* DRAWING FUNCTIONS */

function updateBarChart() {
	 //Code inspired from the lecture site	 
	 //http://dataviscourse.net/2015/lectures/lecture-advanced-d3/
    var url = "http://cube.geekological.com/cube/airquality/aggregate?drilldown=year";
    if(selected_pollutant != "" || city != "")
    url += "&cut=";
    url += selected_pollutant != "" ? "parameter_code:" + encodeURIComponent(selected_pollutant) : "";
    url += (selected_pollutant != "" && city != "") ? ("|city:" + encodeURIComponent(city)) :
            ((city != "") ? ("city:" + encodeURIComponent(city)) : (""));
    //console.log(url);
    d3.json( url, function(error, selectedSeries) {

    var svgBounds = document.getElementById("barChart").getBoundingClientRect(),
        xAxisSize = 100,
        yAxisSize = 60;

    selectedSeries = selectedSeries.cells;
		//console.log(selectedSeries);
    var margin = {top: 40, right: 30, bottom: 40, left: 40};
    var width = svgBounds.width - margin.left - margin.right;
    var height = svgBounds.height - margin.top - margin.bottom;
    var max =500;
    var textWidth = 60;
    // ******* TODO: PART I *******

    // Create the x and y scales; make
    // sure to leave room for the axes
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.05);

    xScale.domain(selectedSeries.map(function (d) {
        return d["year"];
    }));

    var yScale = d3.scale.linear()
        .domain([0, max])
        .range([height , 0])
        .nice();

    var xAxis = d3.svg.axis();
    xAxis.scale(xScale);
    xAxis.orient("bottom").tickFormat('');


    var svgxAxis = d3.select("#xAxis")
        .attr("transform", "translate(" + textWidth + "," + (10 + height)  + ")")
        .call(xAxis);






    var yAxis = d3.svg.axis();
    yAxis.scale(yScale);
    yAxis.orient("left");
    var svgyAxis = d3.select("#yAxis")
        .attr("transform", "translate(" + textWidth + "," + 10 + ")")
        .call(yAxis);



    // Create colorScale (note that colorScale
    // is global! Other functions will refer to it)

    // Create the axes (hint: use #xAxis and #yAxis)

    // Create the bars (hint: use #bars)
    var barGroupsEnter = d3.select("#bars");
    barGroupsEnter.attr("transform", "translate(" + textWidth + "," + 10 + ")");

    var rectangle = barGroupsEnter.selectAll("rect").data(selectedSeries);
    var scales =  barGroupsEnter.selectAll("text").data(selectedSeries);
    scales
        .enter()
        .append("text").text(function (d) {
            //console.log("datetime1", d.year);
            return d.year;
        })
        .attr("x", function(d,i){
            return xScale(d.year) + (xScale.rangeBand())/2 ;
        })
        // dy is a shift along the y axis
        .attr("dy", height + 5)
        // align it to the right
        .attr("text-anchor", "end")
        // center it
        .attr("alignment-baseline", "middle")
        .attr("transform", function(d ,i){
            return "rotate(-90," + (xScale(d.year) + xScale.rangeBand()/2) + ",325)" ;
        });

    scales
        .text(function (d) {
            //console.log("datetime2", d.year);
            return d.year;
        })
        .attr("x", function(d,i){
            return xScale(d.year) + (xScale.rangeBand())/2 ;
        })
        // dy is a shift along the y axis
        .attr("dy", height + 5)
        // align it to the right
        .attr("text-anchor", "end")
        // center it
        .attr("alignment-baseline", "middle")
        .attr("transform", function(d ,i){
            return "rotate(-90," + (xScale(d.year) + xScale.rangeBand()/2) + ",325)" ;
        });

    scales
        .exit()
        .remove();
    // //Bar chart of rectangle
	//console.log("height",height);
    rectangle
        .enter()
        .append("rect")
        .attr("x", function(d , i){
            // //console.log(xScale(i));
            return xScale(d.year);
        })
        .attr("y", function(d , i){
            //console.log("y:",calcAqi(d.average_mean, selected_pollutant));
            return  yScale(calcAqi(d.average_mean, selected_pollutant));
        })
        .attr("width", xScale.rangeBand)
        .attr("height", function(d , i){
			//console.log("h:",height - yScale(calcAqi(d.average_mean, selected_pollutant)));
            return  height - yScale(calcAqi(d.average_mean, selected_pollutant));
        })
        .attr("fill", function(d , i){
        		
            return  colorScale(calcAqi(d.average_mean, selected_pollutant));
        });
        //.on('click', function(d,i){  changeSelection(d);  })
  		 // .on('mouseover', function(d,i){  setHover(d);  })
        //.on('mouseout', function(d,i){  clearHover();  });

    rectangle
        .attr("x", function(d , i){
            // //console.log(xScale(i));
            return xScale(d.year);
        })
        .attr("y", function(d , i){
            // //console.log(d.attendance);
			//console.log("y",calcAqi(d.average_mean, selected_pollutant));
            return  yScale(calcAqi(d.average_mean, selected_pollutant));
        })
        .attr("width", xScale.rangeBand)
        .attr("height", function(d , i){
			//console.log("h",height - yScale(calcAqi(d.average_mean, selected_pollutant)));
            return  height - yScale(calcAqi(d.average_mean, selected_pollutant));
        })
        .attr("fill", function(d , i){

            return  colorScale(calcAqi(d.average_mean, selected_pollutant));
        });

        
    rectangle
        .exit()
        .remove();
    // Make the bars respond to hover and click events
    });
}


function updateForceDirectedGraph() {
    // ******* TODO: PART II *******
    //Code inspired from the lecture site
	// http://dataviscourse.net/2015/lectures/lecture-d3-layouts-maps/
    var width = 427;
    var height = 500;
   var normalshapeSize = 50;
	var selectedShapeSize = 200;

    var force = d3.layout.force()
        // the strength of repulsion/attraction
        // the lower the value, the more repulsion
        // positive values attract each other
        .charge(-120)
        // the target distance between nodes
        .linkDistance(30)
        // how "sticky" things are - 1, no friction, 0 max friction
        .friction(0.9)
        // how strongly the nodes are pulled toward a gravity well (e.g., the center of the svg)
        .gravity(0.1)
        // tells the layout about the available space
        .size([width, height]);

    force
        // providing the layout with the nodes
        .nodes(data.vertices)
        // providing the layouts with the links
        .links(data.edges)
        // first computation
        .start();

    //console.log(force.links());

    var svg = d3.select("#graph");

    var link = d3.select("#links");
    
	 var lines = link.selectAll("line").data(data.edges);
	 
    lines.enter()
        .append("line")
        .attr("class", "link");

    lines.attr("class", "link");


    var node = d3.select("#nodes");
    
	 var vertices =  node.selectAll("path").data(data.vertices);

    vertices.enter()
        .append("path")
        .attr("class", "node")
        .attr("d" , d3.svg.symbol().type(function(d){
        //console.log("data_type == ", d.data_type);
        if(d.data_type == "Game")
        {
            return d3.svg.symbolTypes[0];
        }
        else
        {
            return d3.svg.symbolTypes[5];
        }}).size(function(d,i){
        if(d.data_type == "Game")
        {
            for( var j = 0; j < selectedSeries.length; j++) {
                if ((selectedSeries[j]._id == d._id)) {
                    return selectedShapeSize;
                }
            }
            return normalshapeSize;
        }
        else
        {
            return normalshapeSize;
        }}))
        .style("fill", function (d) {
            // color according to the group
            for( var j = 0; j < selectedSeries.length; j++) {
                if ((selectedSeries[j]._id == d._id)) {
                    return colorScale(d["attendance"]);
                }
            }
            return "blue";
        }).call(force.drag)
        .on('click', function(d,i){  changeSelection(d);  })
		  .on('mouseover', function(d,i){  setHover(d);  })
        .on('mouseout', function(d,i){  clearHover();  });


// changing size of the shapes :
//http://stackoverflow.com/questions/23224285/change-the-size-of-a-symbol-with-a-transition-in-d3-js  

    vertices.attr("d" , d3.svg.symbol().type(function(d){
        //console.log("data_type == ", d.data_type);
        if(d.data_type == "Game")
        {
            return d3.svg.symbolTypes[0];
        }
        else
        {
            return d3.svg.symbolTypes[5];
        }}).size(function(d,i){
        if(d.data_type == "Game")
        {
            for( var j = 0; j < selectedSeries.length; j++) {
                if ((selectedSeries[j]._id == d._id)) {
                    return selectedShapeSize;
                }
            }
            return normalshapeSize;
        }
        else
        {
            return normalshapeSize;
        }}))
        .style("fill", function (d) {
            // color according to the group
            for( var j = 0; j < selectedSeries.length; j++) {
                if ((selectedSeries[j]._id == d._id)) {
                    return colorScale(d["attendance"]);
                }
            }
            return "blue";
        }).call(force.drag)
        .on('click', function(d,i){  changeSelection(d);  })
        .on('mouseover', function(d,i){  setHover(d);  })
        .on('mouseout', function(d,i){  clearHover();  });


    force.on("tick", function () {
        lines.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        vertices.attr("transform", function (d) {
            return "translate(" + d.x + ", " + d.y + ")";
        });
    });

    // Update the links based on the current selection

    // Draw the nodes (hint: use #nodes), and make them respond to dragging

    // ******* TODO: PART IV *******

    // Make the nodes respond to hover and click events

    // ******* TODO: PART V *******

    // Color and size the Game nodes if they are in selectedSeries

    // ******* TODO: PART II *******

    // Finally, tell the layout engine how
    // to manipulate the nodes and links
    // that we've drawn
}

function updateMap() {
    // ******* TODO: PART III *******
	//http://stackoverflow.com/questions/20987535/plotting-points-on-a-map-with-d3
    var height = 900;
    var width  = 500;
    var svg = d3.select("#map");
    var latlong = d3.values(locationData);

    //Define map projection
    projection = d3.geo.albersUsa()
        .translate([height / 2 , width / 2])
        .scale([700]);
	
	var normalshapeSize = 3;
	var selectedShapeSize = 9;
	
	
	var gamePoints = d3.select("#points");
	
	var location = gamePoints.selectAll("circle").data(latlong);
	
 	location.enter()
 			.append("circle")
         .attr("transform", function(d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")"
          })
          .attr("r", function(d,i){
            for( var j = 0; j < selectedSeries.length; j++)
            {
               if((selectedSeries[j].latitude == d.latitude) && (selectedSeries[j].longitude == d.longitude))
                {
                    return selectedShapeSize;
                }
            }
            return normalshapeSize;
           })
        	  .style("fill", function(d, i){
            for( var j = 0; j < selectedSeries.length; j++)
            {
                if((selectedSeries[j].latitude == d.latitude) && (selectedSeries[j].longitude == d.longitude)) {
                    var avergaeAttendance = 0;
                    var games = d["games"];
                    for (var j = 0; j < games.length; j++) {
                        avergaeAttendance = avergaeAttendance + games[j].attendance;
                    }
                    avergaeAttendance = (avergaeAttendance / games.length);
                    return colorScale(avergaeAttendance);
                }
           	}
            return "blue";})
           .style("opacity", 0.8)
           .on('click', function(d,i){  changeSelection(d);  })
           .on('mouseover', function(d,i){  setHover(d);  })
           .on('mouseout', function(d,i){  clearHover();  });
           
     	location.attr("transform", function(d) {
            	return "translate(" + projection([d.longitude, d.latitude]) + ")"
            })
           .attr("r", function(d,i){
            for( var j = 0; j < selectedSeries.length; j++)
            {
                
                if((selectedSeries[j].latitude == d.latitude) && (selectedSeries[j].longitude == d.longitude))
                {
                    return selectedShapeSize;
                }
            }
            return normalshapeSize;
           })
            .style("fill", function(d, i){
                for( var j = 0; j < selectedSeries.length; j++)
                {
                    if((selectedSeries[j].latitude == d.latitude) && (selectedSeries[j].longitude == d.longitude)) {
                        var avergaeAttendance = 0;
                        var games = d["games"];
                        for (var j = 0; j < games.length; j++) {
                            avergaeAttendance = avergaeAttendance + games[j].attendance;
                        }
                        avergaeAttendance = (avergaeAttendance / games.length);
                        return colorScale(avergaeAttendance);
                    }
                }
                return "blue";})
           .style("opacity", 0.8)
           .on('click', function(d,i){  changeSelection(d);  })
           .on('mouseover', function(d,i){  setHover(d);  })
           .on('mouseout', function(d,i){  clearHover();  });

    // Code referenced from stack Overflow   http://stackoverflow.com/questions/20987535/plotting-points-on-a-map-with-d3

    // Draw the games on the map (hint: use #points)

    // NOTE: locationData is *NOT* a Javascript Array, like
    // we'd normally use for .data() ... instead, it's just an
    // object (often called an Associative Array)!

    // ******* TODO: PART V *******

    // Update the circle appearance (set the fill to the
    // mean attendance of all selected games... if there
}
    // are no matching games, revert to the circle's default style)

function drawStates(usStateData) {
    // ******* TODO: PART III *******
	//http://giscollective.org/d3-basemap-with-top/
    var height = 900;
    var width  = 500;
    var svg = d3.select("#map");


    //Define map projection
    projection = d3.geo.albersUsa()
        .translate([height / 2 , width/ 2])
        .scale([700]);
   
    //Define default path generator
    var path = d3.geo.path().projection(projection);
    svg.selectAll("#states")
        .datum(topojson.feature(usStateData,usStateData.objects.states))
        .attr("d", path)



}


/* DATA DERIVATION */

// You won't need to edit any of this code, but you
// definitely WILL need to read through it to
// understand how to do the assignment!

function dateComparator(a, b) {
    // Compare actual dates instead of strings!
    return Date.parse(a.Date) - Date.parse(b.Date);
}

function isObjectInArray(obj, array) {
    // With Javascript primitives (strings, numbers), you
    // can test its presence in an array with
    // array.indexOf(obj) !== -1

    // However, with actual objects, we need this
    // helper function:
    var i;
    for (i = 0; i < array.length; i += 1) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function deriveGraphData() {
    // Currently, each edge points to the "_id" attribute
    // of each node with "_outV" and "_inV" attributes.
    // d3.layout.force expects source and target attributes
    // that point to node index numbers.

    // This little snippet adds "source" and "target"
    // attributes to the edges:
    var indexLookup = {};
    data.vertices.forEach(function (d, i) {
        indexLookup[d._id] = i;
    });
    data.edges.forEach(function (d) {
        d.source = indexLookup[d._outV];
        d.target = indexLookup[d._inV];
    });
}

function deriveLocationData() {
    var key;

    // Obviously, lots of games are played in the same location...
    // ... but we only want one interaction target for each
    // location! In fact, when we select a location, we want to
    // know about ALL games that have been played there - which
    // is a different slice of data than what we were given. So
    // let's reshape it ourselves!

    // We're going to create a hash map, keyed by the
    // concatenated latitude / longitude strings of each game
    locationData = {};

    data.vertices.forEach(function (d) {
        // Only deal with games that have a location
        if (d.data_type === "Game" &&
            d.hasOwnProperty('latitude') &&
            d.hasOwnProperty('longitude')) {

            key = d.latitude + "," + d.longitude;

            // Each data item in our new set will be an object
            // with:

            // latitude and longitude properties,

            // a data_type property, similar to the ones in the
            // original dataset that you can use to identify
            // what type of selection the current selection is,

            // and a list of all the original game objects that
            // happened at this location

            if (!locationData.hasOwnProperty(key)) {
                locationData[key] = {
                    "latitude": d.latitude,
                    "longitude": d.longitude,
                    "data_type": "Location",
                    "games": []
                };
            }
            locationData[key].games.push(d);
        }
    });

    // Finally, let's sort each list of games by date
    for (key in locationData) {
        if (locationData.hasOwnProperty(key)) {
            locationData[key].games = locationData[key].games.sort(dateComparator);
        }
    }
}

function deriveTeamSchedules() {
    var teamName;

    // We're going to need a hash map, keyed by the
    // Name property of each team, containing a list
    // of all the games that team played, ordered by
    // date
    teamSchedules = {};

    // First pass: I'm going to sneakily iterate over
    // the *edges*... this will let me know which teams
    // are associated with which games
    data.edges.forEach(function (d) {
        // "source" always refers to a game; "target" always refers to a team
        teamName = data.vertices[d.target].name;
        if (!teamSchedules.hasOwnProperty(teamName)) {
            teamSchedules[teamName] = [];
        }
        teamSchedules[teamName].push(data.vertices[d.source]);
    });

    // Now that we've added all the game objects, we still need
    // to sort by date
    for (teamName in teamSchedules) {
        if (teamSchedules.hasOwnProperty(teamName)) {
            teamSchedules[teamName] = teamSchedules[teamName].sort(dateComparator);
        }
    }
}


/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)
/*
d3.json("data/Utah.geo.json", function (error, usStateData) {
    if (error) throw error;

    drawStates(usStateData);
});
*/
d3.json("Data/station.json", function (error, loadedData) {
    // if (error) throw error;

    // Store the data in a global variable for all functions to access
/*    data = loadedData;

    // These functions help us get slices of the data in
    // different shapes
    deriveGraphData();
    deriveLocationData();
    deriveTeamSchedules();

    // Start off with Utah's games selected
    selectedSeries = teamSchedules["Washington"];

    // Draw everything for the first time
    updateForceDirectedGraph();*/
	//console.log("came here");
	updateGoogleMap();
	updateBarChart();


});
var marker = 0;
// Create the Google Map…
var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 8,
    center: new google.maps.LatLng(40.7767833, -112.06057),
     mapTypeId: google.maps.MapTypeId.ROADMAP
    //mapTypeId: google.maps.MapTypeId.SATELLITE
    //mapTypeId: google.maps.MapTypeId.HYBRID
});
///cube/airquality/aggregate?drilldown=city|parameter&cut=parameter:Ozone
function updateGoogleMap() {
    //console.log("In google map:", city, selected_pollutant);
	var url1 = "http://cube.geekological.com/cube/airquality/aggregate?drilldown=city";
	//console.log("se out:",url1);
	if(selected_pollutant !== "")
	{
		//console.log("se:",url1);
		url1 += "|parameter_code&cut=";
		url1 += "parameter_code:" + encodeURIComponent(selected_pollutant);
	}
	else
	{
		url1 += "|parameter_code&cut=parameter_code:81102-86502";
	}
	console.log(url1);
	//alert("google",url1);
	d3.json(url1, function(error, data) {
		if (error) throw error;
//d3.json("http://cube.geekological.com/" + "cube/airquality/aggregate?drilldown=city|&cut=parameter:Ozone", function(error, data) {
// Load the station data. When the data comes back, create an overlay.
//d3.json("data/aggregate.json", function(data) {
		//alert("google");
	////console.log("map:",data);
    var overlay = new google.maps.OverlayView();

    // Add the container when the overlay  is added to the map.
    overlay.onAdd = function() {
        var dataneeded = data.cells;
        var min = d3.min(dataneeded.map(function(d){return d.average_mean;}));
        var max = d3.max(dataneeded.map(function(d){return d.average_mean;}));
        var diff = max -min;
        var sizeScale = d3.scale.linear().domain([min, max]).range([0.5,12]);
        var color = d3.scale.linear()
            .domain([min, min + diff/9,min + 2*diff/9, min + 3*diff/9, min +
                4*diff/9, min + 5*diff/9,min + 6*diff/9,min + 7*diff/9,min + 8*diff/9, max])
                .range(colorbrewer.BuPu[9]);
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "stations");
        //console.log(data.cells);
        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 20;
            if(marker !== 0) {
                //console.log("not first time");
                marker.remove();
            }
            marker = layer.selectAll("svg").data(data.cells);

            marker.each(transform) // update existing markers
                .enter().append("svg:svg")
                .each(transform)
                .attr("class", "marker");

            marker.append("svg:circle")
                .attr("r", function(d,i){
                    if(d.city == city)
                        return "20";
                    else
                        return sizeScale(d.average_mean);
                })
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("fill",function(d,i){
                        return color(d.average_mean);
                })
                .attr("opacity", function(d,i){
                 if(d.city == city)
                 return "1";
                 else
                 return "0.5";
                 })
                .on('click', function(d,i){
					city = d.city;
					changeSelection(d);  })
                .call(d3.helper.tooltip(
                    function(d, i){
                        return "<b> "+d.city + "</b><br/>Value: "+d.average_mean.toFixed(3);
                    }
                ));

            function transform(d) {
                d = new google.maps.LatLng(d.avg_lat, d.avg_long);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }
        };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
})};
