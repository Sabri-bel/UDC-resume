
//initialize maps with the function initmap()
//  create a new map object and tag with the id map for rendering in that position
//  add the coordinates latitude and longitude-->

        function initMap() {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: {
                    lat: 46.619261,
                    lng: -33.134766
                }
            });
        //add alphabet letters as labels for each location added
        var labels = "ABCDEFGHILMNOPQRSTUVZ";
        //the following array will contains set of object, each of them has latitude
        //and longitude of the single point in space 
        var locations = [
            {lat: 40.785091, lng: -73.968285},
            {lat: 41.084045, lng: -73.874245},
            {lat: 40.754932, lng: -73.984016}
        ];
        //iterate through array and create new marker with the label from the previous string
        var markers = locations.map(function(location, i){
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                    //% operator is used for loop back from z to a instead of throwing an error
                });
            });
            var markerClusterer = MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        }
    