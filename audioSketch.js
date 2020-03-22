let audioStarted = false;
let playAudioButton;
var bandwidth = 512;
var band;
//var song;
 
//We dont need this function the program will run without it but we get an appendChild error if it is removed
preload = function() {
    song = loadSound("skyrim-orchestra.mp3");
  }
 var t = function (p) {
   var song;
   p.setup = function() {
     //let cnv = p.createCanvas(350, 350); //this goes with the canvas presssed code
     p.createCanvas(350, 350);
     p.colorMode(p.RGB, 100);
     //p.colorMode(p.HSB);
     song = p.loadSound("skyrim-orchestra.mp3", loaded);
     fft = new p5.FFT(0, bandwidth);
     band = p.width / bandwidth;
     song.amp(0.2);
     //cnv.mousePressed(p.canvasPressed); dont need this unless we want the song to play when  the canvas is pressed 

     playAudioButton = audio.select('#play');
     //audio.noLoop();
     //playAudioButton.mousePressed(togglePlaying); dont need this
 }

 function loaded(){
  playAudioButton.mousePressed(togglePlaying); //so that the play button wont work until song is loaded
  console.log("loaded");
 }

 function togglePlaying() {
  if (!song.isPlaying()) {
    p.getAudioContext().resume();
    song.play();
    audioStarted = true;
    playAudioButton.html('Pause');
    console.log("starting");
    
  } else {
    audioStarted = false;
    song.pause();
    //p.getAudioContext().suspend();
    playAudioButton.html('Play');
    console.log("stopping");
  }
}

 //p.canvasPressed = function() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  //song.play();
 // song.setVolume(0.5);
//}

   p.draw = function() {
    p.background(55);
    p.smooth(1);
    if (audioStarted == true){
      console.log(audioStarted);
    let spectrum = fft.analyze();
    p.noStroke();
    p.fill(2, 43, 255);
    for (let i = 0; i < spectrum.length; i++){
      //let x = p.map(i, 0, spectrum.length, 0, p.width);
      let amp = spectrum[i];
      let y = p.map(amp, 0, 256, p.height, 175);
      //p.colorMode(p.HSB);
      //let h = -p.height + p.map(spectrum[i], 0, 256, p.height, 0);
      p.fill(2, i, 25);
      p.smooth(1);
      p.rect(i * band, y, band - 5, p.height - y)
    }

    let waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = p.map(i, 0, waveform.length, 0, p.width);
      let y = p.map(waveform[i], -1, 1, 0, p.height);
      p.vertex(x,y);
    }
    p.endShape();

  }

  
     }
   }
 
 
 var audio = new p5(t, 'audiocanvascontainer');