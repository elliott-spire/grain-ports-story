function showData(index) {
    // change display time
    var timestring = DATA[index]['time'];
    changeTimeDisplay(timestring);
    // get layer id
    var layer_id = 'layer' + index;
    // show the specified data
    window.map.setPaintProperty(layer_id, 'circle-opacity', 1);
    if (window.CurrentLayer) {
        // make previous layer invisible
        window.map.setPaintProperty(window.CurrentLayer, 'circle-opacity', 0);
    }
    // set current layer
    window.CurrentLayer = layer_id;
}

function initializePrecipData(data, i) {

    var source_id = 'source' + i;
    var layer_id = 'layer' + i;

    // add data
	window.map.addSource(source_id, {
      type: 'geojson',
      data: data
    });

    // add data layers
	window.map.addLayer({
		'id': layer_id,
		'type': 'circle',
		'source': source_id,
        'paint': {
            // make circles larger as the user zooms from z5 to z22
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [5, 3],
                    [10, 25],
                    [22, 200]
                ]
            },
            // color circles by 'tp' (total precipitation)
            'circle-color': {
                property: 'tp',
                stops: [
                    [0,  'rgba(255,255,255,0.05)'], // white nearly invisible
                    [1,  'rgba(160,180,255,0.2)'], // fades out into:
                    [10, 'rgba(120,160,250,0.4)'],
                    [20, 'rgba(90,120,240,0.6)'],
                    [30, 'rgba(60,90,210,0.8)'],
                    [40, 'rgba(40,60,190,1.0)'],
                    [50, 'rgba(5,10,170,1.0)']
                ]
            },
            // initialize as invisible
            'circle-opacity': 0
        }
	});

    // https://blog.mapbox.com/introducing-data-driven-styling-in-mapbox-gl-js-f273121143c3

    var popup = new mapboxgl.Popup({
        // className: 'precip-popup',
        closeButton: false,
        closeOnClick: false,
        closeOnMove: true
    });
     
    window.map.on('mouseenter', layer_id, function(e) {
        if (window.CurrentLayer == layer_id) {
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
                .setHTML('Precipitation:<br><b>' + tp + '</b> mm')
                .addTo(map);
        }
    });

    window.map.on('mouseleave', layer_id, function() {
        window.map.getCanvas().style.cursor = '';
        popup.remove();
    });
}
