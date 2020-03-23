//adsrStarted = false;
let wave; 
let button; 
let env;


 

 var a = function (p) {
   p.setup = function() {
     p.createCanvas(350, 350);

    env = new p5.Env();
    env.setADSR(0.05, 0.1, 0.5, 1); //attack decay sustain release
    env.setRange(1.2, 0); //attack volume and release volume
//now connect the waveform and the envelope together and then visualize 
     wave = new p5.Oscillator();
    fft = new p5.FFT();

     wave.setType('sine');
     wave.start();
     wave.freq(440);
     wave.amp(env); //set it here

     button = adsr.createButton('play');
     button.mousePressed(toggle);
 }


   p.draw = function() {
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
    //    if(adsrStarted){
    // p.background(255, 0, 255);
    //    } else {
    //        p.background(51);
    // }
  }
  function toggle() {
      env.play();
    //   if (!playing) {
    //       wave.amp(0.5, 1);
    //       playing = true;
    //   } else {
    //       wave.amp(0, 1);
    //       playing = false;
    //   }
  }
}
 
 
 var adsr = new p5(a, 'asdrcanvascontainer');
