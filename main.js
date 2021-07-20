imaage = "";
status = "";
object = [];
r = 0;
g = 0;
b = 0;
song = 0;


function preload(){

   song  = loadSound("answer_me.mp3");

}
function setup(){

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
    objectDetectorCOOCOO = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object :)";


}

function draw(){
    
    image(video, 0, 0, 380, 380);

    if(status != ""){

        objectDetectorCOOCOO.detect(video, gotResult);
        song.stop();

        for(i = 0; i < object.length; i++){

            if(results[0].label = "person"){

                document.getElementById("status").innerHTML = "Status: Object Detected :D";
                document.getElementById("objects_no").innerHTML = "Baby Found";
                fill(r, g, b);
                percent = floor(object[i].confidence * 100);
                text(object[i].label  + " " + percent + "%,", object[i].x, object[i].y + 10);
                noFill();
                stroke(r, g, b);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
                song.stop();
                
            }

        }
        

    }
    else{

        play();

    }

}

function play(){
    
    song.play();

}

function modelLoaded(){

    console.log("model has been loaded");
    status = true;
    
}

function gotResult(error, results){

    if(error){

        console.error(error);

    }
    else{

        console.log(results);
        object = results;

    }

}