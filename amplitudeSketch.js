
let songAmplitude;
let songVolume;

let volumeSlider;
let panSlider;
let playbackRateSlider;
let sampleRateSlider;

let playPauseButton;
let fastForwardButton;

let volumeHistory = [ ];

let playPause = document.getElementById("playamp");
playPause.disabled = false;
let playAdsr = document.getElementById("playadsr");
playAdsr.disabled = false;

    
// playPause.addEventListener('click', function(event) {
//     playAdsr.disabled = true;
//     });

function preload() {
    song = loadSound('skrim-orchestra.mp3');
}

 var a = function (p) {
    let song;
   p.setup = function() {
     p.createCanvas(500, 500);
     songAmplitude = new p5.Amplitude();
     song = p.loadSound("skyrim-orchestra.mp3");

     

     let controlsDiv = p.createDiv();
     controlsDiv.id('controlsDiv');

     playPauseButton = ampSketch.select('#playamp');
     playPauseButton.mousePressed(togglePlayingSong);
     controlsDiv.child(playPauseButton);


    //  playPauseButton = p.createButton('play');
    //  playPauseButton.id('playPauseButton');
    //  controlsDiv.child(playPauseButton);
    //  playPauseButton.mousePressed(togglePlayingSong);

     let volumeSliderDiv = p.createDiv('Volume');
     controlsDiv.child(volumeSliderDiv);
     volumeSliderDiv.id('sliderLabel');
     volumeSlider = p.createSlider(0, 0.75, 0.375, 0.01875);
     controlsDiv.child(volumeSlider);

     let panDiv = p.createDiv('Panning');
     controlsDiv.child(panDiv);
     panDiv.id('sliderLabel');
     panSlider = p.createSlider(-1, 1, 0, 0.025);
     controlsDiv.child(panSlider);

     let pbRateDiv = p.createDiv('Playback Speed');
     controlsDiv.child(pbRateDiv);
     pbRateDiv.id('sliderLabel');
     playbackRateSlider = p.createSlider(0, 2, 1, 0.0125);
     controlsDiv.child(playbackRateSlider);


 }

 function togglePlayingSong(){
    if(!song.isPlaying()){
        adsr.noLoop();
        ampSketch.loop();
        playAdsr.disabled = true;
        //userAudio.noLoop()
        song.play();
        playPauseButton.html('PAUSE');
    }else if (!song.isPaused()){
        song.pause();
        playAdsr.disabled = false;

        playPauseButton.html('PLAY');
        playPauseButton.mousePressed(togglePlayingSong);
    }
  }


   p.draw = function() {
       p.background(52, 58, 64);

       song.setVolume(volumeSlider.value());
       song.pan(panSlider.value());
       song.rate(playbackRateSlider.value());

       songVolume = songAmplitude.getLevel();
       volumeHistory.push(songVolume);

       for(let i = 500; i > 0; i -= 25) {
           p.stroke(108, 117, 125);
           p.strokeWeight(0.25);
           p.line(0, i, p.width, i);
           for(let j = 500; j > 0; j -= 25){
               p.stroke(108, 117, 125);
               p.strokeWeight(0.25);
               p.line(j, 0, j, p.height);
           }
       }
       //this is the color of the amplitude line
       p.stroke(255, 255, 255);
       p.strokeWeight(2.5);
       p.noFill();
       p.beginShape();

       //this is the amplitude line 
       for(let i = 0; i < volumeHistory.length; i += 1){
           let yAxis = p.map(volumeHistory[i] * 4, 0, 1, 445, 0);
           p.vertex(i, yAxis);
       }
       p.endShape();

       //this is the verical line
       if(volumeHistory.length > p.width - 50){
           volumeHistory.splice(0,1);
       }
       p.stroke(220, 53, 69);
       p.strokeWeight(4);
       p.line(volumeHistory.length, 0, volumeHistory.length, p.height);

       //this is the horizontal line
       p.stroke(30, 187, 201);
       p.strokeWeight(4);
       p.line(0, 450, p.width, 450);
  }



  }

 
 
 var ampSketch = new p5(a, 'ampcanvascontainer');
