img = "";
objects = "";
status = "";
song = "";

function preload(){
    img = loadImage("dog_cat.jpg");
    song = loadSound("alarm_clock_old.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector(cocossd, modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(0, 0, 380, 380);
    
    if(status != ""){
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}