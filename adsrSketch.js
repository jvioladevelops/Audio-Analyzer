//adsrStarted = false;
let wave; 
let button; 
let env;



let attackSlider;
let decaySlider; 
let sustainSlider; 
let releaseSlider;
let attackDiv;
let decayDiv; 
let sustainDiv; 
let releaseDiv;


 

 var a = function (p) {
   p.setup = function() {
     p.createCanvas(500, 500);

    //adsr.noLoop();
    env = new p5.Envelope();
    //env.setADSR(0.05, 0.5, 0.5, 1); //attack decay sustain release
    env.setADSR(attackSlider, decaySlider, sustainSlider, releaseSlider);
    env.setRange(1.2, 0); //attack volume and release volume
//now connect the waveform and the envelope together and then visualize 
     wave = new p5.Oscillator();
     wave.setType('sine');
     //wave.start();
     wave.freq(200);
     wave.amp(env); //set it here
amplitude = new p5.Amplitude();

let adsrControlsDiv = p.createDiv();
adsrControlsDiv.id('adsrControlsDiv');
//adsrControlsDiv.position(950, -50);

button = adsr.select('#playadsr');

button.mousePressed(toggle);
adsrControlsDiv.child(button);


     attackDiv = p.createDiv('Attack');
     adsrControlsDiv.child(attackDiv);
     attackDiv.id('sliderLabel');
     //attackDiv.position(900, -45);
     attackSlider = p.createSlider(0, 1, 0.05, 0.05);
     adsrControlsDiv.child(attackSlider);
     //attackSlider.position(650, 50);

     decayDiv = p.createDiv('Decay');
     adsrControlsDiv.child(decayDiv);
     decayDiv.id('sliderLabel');
     //decayDiv.position(900, 0)
     decaySlider = p.createSlider(0, 1, 0.5, 0.05);
     adsrControlsDiv.child(decaySlider);
     //decaySlider.position(650, 100);

     sustainDiv = p.createDiv('Sustain');
     adsrControlsDiv.child(sustainDiv);
     sustainDiv.id('sliderLabel');
     sustainSlider = p.createSlider(0, 1, 0.5, 0.05);
     adsrControlsDiv.child(sustainSlider);

     releaseDiv = p.createDiv('Release');
     adsrControlsDiv.child(releaseDiv);
     releaseDiv.id('sliderLabel');
     releaseSlider = p.createSlider(0, 1, 1, 0.05);
     adsrControlsDiv.child(releaseSlider);

 }

 function toggle(){
    ampSketch.noLoop();
    adsr.loop();
   // userAudio.noLoop()
      wave.start();
      env.play();
      

}


   p.draw = function() {

   p.background(0);

   let gridSpacing = 25;

   for(let i = 500; i > 0; i -= gridSpacing) {
    p.stroke(16, 201, 19);
    p.strokeWeight(0.5);
    p.line(0, i, p.width, i);
    for(let j = 500; j > 0; j -= gridSpacing){
        p.stroke(16, 201, 19);
        p.strokeWeight(0.5);
        p.line(j, 0, j, p.height);
    }
}

    p.fill(227, 18, 18);
   let level = amplitude.getLevel();
   let size = p.map(level, 0, 1, 0, 500);
   p.ellipse(p.width/2, p.height/2, size, size);

   let attackTime = attackSlider.value();
   let decayTime = decaySlider.value();
   let sustainAmp = sustainSlider.value();
   let releaseTime = releaseSlider.value();

   env.setADSR(attackTime, decayTime, sustainAmp, releaseTime);




  }

}
 
 
 var adsr = new p5(a, 'adsrcanvascontainer');