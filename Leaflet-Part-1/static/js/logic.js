
function init(){
	// Creating our initial map object:
	// We set the longitude, latitude, and starting zoom level.
	// This gets inserted into the div with an id of "map".
	let myMap = L.map("map", {
	  center: [37.09,-95.71],
	  zoom: 5
	});

	// Adding a tile layer (the background map image) to our map:
	// We use the addTo() method to add objects to our map.
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(myMap);
	
	add_markers(myMap);
	

/*
	let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
	d3.json(url).then(function (data) {
		console.log(data);
		alert(data.features.length);
		for (let i=0;i<data.features.length;i++){
			console.log(data.features[i]);
		}
		//createFeatures(data.features);
	});
*/	
	
	
	
	/*
	let pth="data/significant_month.geojson";
	d3.json(pth).then(function (data) {
		for (let i=0;i<data.length;i++){
			console.log(data[i]);
		}
		//createFeatures(data.features);
	});
	*/
}

function normalize(val, max, min) { 
    if(max - min === 0) return 0; // or 0, it's up to you
	let res=Math.abs((val-1500)/3000);
	res=Math.trunc(res*16777215);
	res=res.toString(16);
	return res;
}

function add_markers(myMap){
	//alert('adding markers');
	//let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
	let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
	d3.json(url).then(function (data) {
		console.log(data);
		//alert(data.features.length);
		for (let i=0;i<data.features.length;i++){
			console.log(data.features[i]);
			let coords=data.features[i].geometry.coordinates;
			let lon=coords[0];
			let lat=coords[1];
			let depth=coords[2];
			depth="#" + normalize(depth,16777215,0);
			let properties=data.features[i].properties;
			let mag=properties.mag;
			mag=mag**7;
			//alert(mag);
			
			var circle = L.circle([lat,lon], {
				color: depth,
				stroke: false,
				//fillColor: depth,
				//fillColor: depth,
				fillOpacity: 0.5,
				radius: mag,
			}).addTo(myMap);
			
		}
		//createFeatures(data.features);
	});	
}









init();