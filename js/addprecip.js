function addPrecipData() {

    // add data
	window.map.addSource('precip', {
      type: 'geojson',
      data: DATA
    });

    // add data layers
	window.map.addLayer({
		'id': 'precipitation_layer',
		'type': 'circle',
		'source': 'precip',
		// 'layout': {
		// 	'icon-image': 'vessel',
		// 	'icon-size': 0.15,
		// 	'icon-rotate': ['get', 'tp'],
		// },
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [5, 3],
                    [10, 25],
                    [22, 200]
                ]
            },
            // color circles by ethnicity, using a match expression
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': {
                property: 'tp',
                stops: [
                    [0, 'rgba(255,255,255,0.05)'], // white nearly invisible
                    [1, 'rgba(150,180,250,0.1)'], // fades out into:
                    [10, 'rgba(90,120,240,0.4)'],
                    [50, 'rgba(60,90,210,0.6)'],
                    [100, 'rgba(40,60,190,0.8)'],
                    [140, 'rgba(5,10,170,1.0)']
                ]
            }
        }
	});

    // https://blog.mapbox.com/introducing-data-driven-styling-in-mapbox-gl-js-f273121143c3

    var popup = new mapboxgl.Popup({
        // className: 'precip-popup',
        closeButton: false,
        // closeOnClick: false
    });
     
    window.map.on('mouseenter', 'precipitation_layer', function(e) {
        // Change the cursor style as a UI indicator.
        window.map.getCanvas().style.cursor = 'pointer';
         
        var coordinates = e.features[0].geometry.coordinates.slice();
        var tp = e.features[0].properties.tp;
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
            .setLngLat(coordinates)
            .setHTML('Total Precip.<br><b>' + tp + '</b> mm')
            .addTo(map);
    });
         
    window.map.on('mouseleave', 'places', function() {
        window.map.getCanvas().style.cursor = '';
        popup.remove();
    });
}
