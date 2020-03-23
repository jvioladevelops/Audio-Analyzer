
/**
 * Game Sketch
 * @author Justin Viola 
 */

var userAudioStarted = false;

//Setting the entire sketch as a variable that is callable in other folders
var s = function(p) {
  var mic;
    p.setup = function() {
      //Create the canvas
        p.createCanvas(350,350);
        mic = new p5.AudioIn();
        micButton = userAudio.select('#mic');
        micButton.mousePressed(touchStarted);
        mic.start();
        //var vol = mic.getLevel();
        //userAudio.loop();
    }

    p.draw = function() {
      p.background(153, 200, 247);
      p.x = p.lerp(mic.getLevel() * 1, mic.getLevel() * 10000, 0.5 )
      p.ellipse(175, 175, 350, p.x);
      //console.log(vol);

  }

  function touchStarted() {
    if (p.getAudioContext().state !== 'running') {
      //icButton.html('Pause Mic');
      p.getAudioContext().resume();
    }
  }

  
}

var userAudio = new p5(s, 'useraudiocanvascontainer');

