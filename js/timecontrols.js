// change the text above the time slider
function changeTimeDisplay(timestring) {
    document.getElementById('timedisplay').innerHTML = timestring;
}

// iterate through WMS images and visible vessels in a loop
var playTime = function(init) {
  pauseTime();
  // var frameRate = 0.5; // 1 frame per 2 seconds
  // var frameRate = 1.0; // 1 frame per second
  var frameRate = 4.0; // 1 frame per second
  window.Animation = window.setInterval(function() {
        // get the slider's current position
        var slider = document.getElementById('slider');
        var index = Number(slider.value);
        // check index value to determine whether to
        // iterate forwards or loop to beginning
        if (index < 28) {
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
    window.clearInterval(window.WMS_Animation);
    window.Animation = null;
  }
};

window.addEventListener('load', function() {
    // handler for WMS time slider while it is moving
    document.getElementById('slider').oninput = function() {
        var index = String(this.value);
        showData(index);
    };
});