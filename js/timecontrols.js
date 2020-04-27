// change the text above the time slider
function changeTimeDisplay(timestring) {
    document.getElementById('timedisplay').innerHTML = timestring;
}

// iterate through precipitation data time windows in a loop
var playTime = function(init) {
  pauseTime();
  // var frameRate = 0.5; // 1 frame per 2 seconds
  // var frameRate = 1.0; // 1 frame per second
  var frameRate = 5.0; // 1 frame per second
  window.Animation = window.setInterval(function() {
        // get the slider's current position
        var slider = document.getElementById('slider');
        var index = Number(slider.value);
        // check index value to determine whether to
        // iterate forwards or loop to beginning
        if (index < window.TimeIndexLength) {
            // increase index by 1
            index += 1;
        } else {
            // reset slider to starting position
            index = 0;
        }
        // set the slider position
        slider.value = index;
        // show the precipitation data
        showData(String(index));
  }, 1000 / frameRate);
};

// stop animation
var pauseTime = function() {
  if (window.Animation !== null) {
    window.clearInterval(window.Animation);
    window.Animation = null;
  }
};

// wait for page to load before adding event handlers
window.addEventListener('load', function() {

    // handler for time slider while it is moving
    document.getElementById('slider').oninput = function() {
        var index = String(this.value);
        showData(index);
    };

    // handler for time slider while it is moving
    var playpause = document.getElementById('playpause');
    function togglePlay() {
        if (playpause.className == 'play') {
            playpause.className = 'pause';
            playTime();
        } else {
            playpause.className = 'play';
            pauseTime();
        }
    };
    playpause.onclick = togglePlay;
    document.getElementById('timedisplay').onclick = togglePlay;

});