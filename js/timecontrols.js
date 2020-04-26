function changeTimeDisplay(timestring) {
    document.getElementById('timedisplay').innerHTML = timestring;
}

window.addEventListener('load', function() {

    // handler for WMS time slider while it is moving
    document.getElementById('slider').oninput = function() {
        var index = String(this.value);
        // var timestring = DATA[index]['time'];
        // changeTimeDisplay(timestring);
        showData(index);
        // if (window.WMS_Animation_Times.length > 0) {
        //     // use the integer value of the slider
        //     // to set the WMS time index
        //     var time = window.WMS_Animation_Times[this.value];
        //     // only change the time display, don't actually set the time
        //     changeTimeDisplay(time);
        // } else {
        //     // reset slider to starting position
        //     // if no WMS times are available
        //     this.value = 0;
        // }
    };

    // // handler for WMS time slider change (after mouse up)
    // document.getElementById('slider').onchange = function() {
    //     // console.log('onchange', this.value)
    //     var index = String(this.value);
    //     // change the visible precipitation data
    //     showData(index);
    //     // if (window.WMS_Animation_Times.length > 0) {
    //     //     // use the integer value of the slider
    //     //     // to set the WMS time index
    //     //     setWMSTime(window.WMS_Animation_Times[this.value]);
    //     // } else {
    //     //     // reset slider to starting position
    //     //     // if no WMS times are available
    //     //     this.value = 0;
    //     // }
    // };

});