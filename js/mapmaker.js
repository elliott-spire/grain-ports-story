window.addEventListener('load', function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4LWFib3VjaGFyLXNwaXJlIiwiYSI6ImNrNjJyMHJsMjBoZWIzZW9mNjN4bXNnOHcifQ.zrek-R9VqJNAdnKK7SyZVg';

    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-98, 37],
        zoom: 3.5,
        pitch: 40.00,
        bearing: 0,
        attributionControl: false
        // scrollZoom: false,
        // transformRequest: transformRequest
    });

    // Attribution required, but here we make it smaller
    window.map.addControl(new mapboxgl.AttributionControl({
        compact: true
    }));

    // Add zoom and rotation controls to the map.
    window.map.addControl(new mapboxgl.NavigationControl());

    window.map.on('load', function() {
        // initialize time index object
        window.TimeIndex = {};
        // get number of time windows
        window.TimeIndexLength = Object.keys(DATA).length - 1;
        // set time slider's maximum value
        document.getElementById('slider').max = window.TimeIndexLength;
        // initialize all the data layers
        for (var i=0; i <= window.TimeIndexLength; i++) {
            var index = String(i);
            var timestring = Object.keys(DATA)[i];
            var data = DATA[timestring];
            // add to time index for easy lookup
            window.TimeIndex[index] = timestring;
            // turn raw data into map layers
            initializePrecipData(data, timestring, index);
        }
        // initialize first layer and time slider
        // (should be tuned based on current data)
        initializeTime(8);
        // show display time
        document.getElementById('time').style.display = 'block';
        // start time playback
        // playTime();
    });

    document.getElementById('neworleans').onclick = function() {
        window.map.flyTo({
            center: [-90.071533, 29.951065],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }

    document.getElementById('houston').onclick = function() {
        window.map.flyTo({
            center: [-95.358421, 29.749907],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }

    document.getElementById('baltimore').onclick = function() {
        window.map.flyTo({
            center: [-76.609383, 39.299236],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }

    document.getElementById('norfolk').onclick = function() {
        window.map.flyTo({
            center: [-76.285873, 36.850769],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }

    document.getElementById('seattle').onclick = function() {
        window.map.flyTo({
            center: [-122.335167, 47.608013],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }

    document.getElementById('portland').onclick = function() {
        window.map.flyTo({
            center: [-122.676483, 45.523064],
            zoom: 7.0,
            pitch: 20.00,
            bearing: 0
        });
    }
});
