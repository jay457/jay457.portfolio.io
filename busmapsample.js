(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.650627, -63.597140], 14);

    // Layers for map image itself
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    // Bus Icon
    busIcon = L.icon({
        iconUrl: 'assets/bus.png',
        iconSize: [50, 50]
    });

    let running = false;

    draw();

    // Calls the draw method every [time] milliseconds
    let time = 4000;
    window.setInterval(draw, time);

    // Executes all functions if not already running 
    function draw() {
        if(!running){
            running = true;
            fetch('https://hrmbusapi.herokuapp.com/')
                .then(function(response){
                    return response.json();
                })
                .then(function(json){

                    removeMarkers();

                    let rawData = filterBusData(json);
                    
                    let coordsMap = convertToGeoJSONFormat(rawData);

                    addPointsToMap(coordsMap);
                    
                })
            running = false;
            }
        }

    // Filters bus data by route id
    function filterBusData(json){
        return json.entity.filter(e=>e.vehicle.trip.routeId <= 1000);
    }

    // Converts data to GeoJSON Format
    function convertToGeoJSONFormat(data){
        return data.map(e=>new Object({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [e.vehicle.position.latitude,e.vehicle.position.longitude],
                bearing: e.vehicle.position.bearing
            },
            busId: e.id,
            speed: e.vehicle.position.speed,
            route: e.vehicle.trip.routeId
        }))
    }

    // Adds Markers to map
    function addPointsToMap(points){
        points.map(function(e){L.marker(e.geometry.coordinates, {icon: busIcon, rotationAngle: e.geometry.bearing}).addTo(map)
            .bindPopup("ID: " + e.busId + " | Route: " + e.route + " | Speed: " + e.speed);
        });
    }

    // Removes all bus markers on map
    function removeMarkers(){
        // instanceof filter referenced from https://gist.github.com/tomasevich/5bf989ab2d1578382ab06f58badd5bc3
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker)
            {
                map.removeLayer(layer)
            }
        });
    }

})()