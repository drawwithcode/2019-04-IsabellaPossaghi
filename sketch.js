var allMyGaster = [];
var amountOfGaster = 6;
let gaster;
var analyzer;
let t = 0; // time variable

//stalking (easing) variables
// let x = 1;
// let y = 1;
// let easing = 0.5;

function preload() {
  //LOADING IMAGES no copyrigt
  gaster = loadImage('./assests_images/gaster.png');
  sans = loadImage('./assests_images/sans.png');
  sans_up = loadImage('./assests_images/sans_up.png');
  hallway = loadImage('./assests_images/hallway.png');
  soul = loadImage('./assests_images/soul.png');
  gaster_shoot = loadImage('./assests_images/gaster_shoot.png');
  bone = loadImage('./assests_images/bone.png');
  energy = loadImage('./assests_images/energy.png');
  //LOADING SOUND
  mySong = loadSound('./assests_sound/megalovania.mp3'); //no copyright! it's a remixed version



}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //song amplitude
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);


  for (var i = 0; i < amountOfGaster; i++) {
    //gaster spawn point
    var tempx = width / 2;
    var tempy = height / 2;

    var tempGaster = new Gaster(tempx, tempy);

    allMyGaster.push(tempGaster);
  }

}

function draw() {

  //keydown
  if (keyIsDown(70)) {

    //play megalovania!
    if (mouseIsPressed) {
      if (mySong.isPlaying() == false) {
        mySong.play();
      }
    } else {
      mySong.stop();
    }
    //volume analyzer
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height);


    // bone grid

    for (let x = 0; x <= width; x = x + 90) {
      for (let y = 0; y <= height; y = y + 40) {

        const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
        const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);

        const angle = xAngle * (x / width) + yAngle * (y / height);

        // single bone movement
        const myX = x + 10 * cos(2 * PI * t + angle) * 2;
        const myY = y + 10 * sin(2 * PI * t + angle) * 2;


        image(bone, myX, myY, volume/2, volume/2);
      }
    }
    // timing bones
    t = t + 0.01;

    //translucent background
    background(0, 50);


    //define gaster
    for (var i = 0; i < allMyGaster.length; i++) {

      var tempGaster = allMyGaster[i];
      tempGaster.move();
      tempGaster.show();
    }

    //keydown
  } else {
    background(0, 50);
    imageMode(CENTER);
    image(hallway, width / 2, height / 2, 900, 700);

    var myText = "You're Gonna Have a Bad Time, Now Keep Down F"
    textFont("VT323");
    textSize(50);
    fill(255)
    drawingContext.font = "120, VT323";
    drawingContext.textAlign = "center";
    text(myText, width / 1.7, height / 1.1);

    image(sans_up, width / 4.5, height / 1.15, 180, 150)
  }
}

function Gaster(_x, _y, _size, _img) {
  //Inner properties
  this.size = 240;
  this.x = _x;
  this.y = _y;
  this.speed = 5;



  var yIncrease = this.speed * random(1, 2);
  var xIncrease = this.speed * random(1, 2);



  this.move = function() {
    //gaster wandering around
    this.x += xIncrease * random(1,5);
    this.y += yIncrease * random(1,5);

    //gaster stalking u
    // let targetX = mouseX;
    // let dx = targetX - x;
    // x += dx * easing;
    //
    // let targetY = mouseY;
    // let dy = targetY - y;
    // y += dy * easing;
    //
    //
    // this.x = (x+random(1,2)) * xIncrease ;
    // this.y = (y+random(1,2)) * yIncrease ;

    if (this.y > windowHeight || this.y < 0) {
      yIncrease = -yIncrease;
    }


    if (this.x < 0 || this.x > windowWidth) {
      xIncrease = -xIncrease;
    }
  }

  //Display method
  this.show = function() {

    push();
    //gaster awaken
    if (mouseIsPressed) {
      imageMode(CENTER)
      image(energy, this.x * random(1, 1.01), this.y * random(1, 1.01), 100, 250);
      image(gaster_shoot, this.x * random(1, 1.01), this.y * random(1, 1.01), 200, 250);
      image(sans_up, width / 2 * random(1, 1.01), height / 2 * random(1, 1.01), volume*3.5, volume*3);

    } else {
      imageMode(CENTER)
      image(gaster, this.x * random(1, 1.01), this.y * random(1, 1.01), this.size, this.size);
      image(sans, width / 2, height / 2, 150, 200);

      var myText = "Let's just get to the point. Keep Down F and Click"
      textFont("VT323");
      textSize(50);
      fill("red")
      drawingContext.font = "120, VT323";
      drawingContext.textAlign = "center";
      text(myText, width / 2, height / 1.4);

    }
    //your soul! FILL IT WITH DETERMINATION!
    image(soul, mouseX * random(1, 1.001), mouseY * random(1, 1.001), 60, 50)
    pop();


  }
}
