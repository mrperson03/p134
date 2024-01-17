
sound = "";
status = "";
objects = [];

function preload() {
    sound = loadSound("emergency-alarm-with-reverb-29431.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
    console.log("Model loaded");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 640, 420);

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);


        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status = Objects detected";

            document.getElementById("numberofobjects").innerHTML = "Number of objects detected are: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(objects[i].label == true) {
            document.getElementById("baby_status").innerHTML = "Baby is detected";
            sound.stop();
        }
        else {
            document.getElementById("baby_status").innerHTML = "Baby is not detected";
            sound.play();
        }

        if(objects.length < 0) {
            document.getElementById("baby_status").innerHTML = "Baby is not detected";
            sound.play();
        }
    }
}