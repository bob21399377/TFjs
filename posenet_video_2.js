const frames = []
function selectvideoFile(files){
    if (!files.length) {
        return false;
    }
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function () {
        document.getElementById('video').src = this.result;
    };
    reader.readAsDataURL(file);
}
function submit(){
    const video = document.getElementById("video");
    video.play();
    const drawingLoop = async(timestamp, frame) => {
        const bitmap = await createImageBitmap(video);
        frames.push(bitmap);
        if(!video.ended){
            video.requestVideoFrameCallback(drawingLoop);
        }
        else{
            console.log("drawingLoop End!");
            Load_Image();
        }
    };
    console.log("drawingLoop Start!");
    video.requestVideoFrameCallback(drawingLoop);
}
function Load_Image(){
    console.log("Load_Image Start!");
    const div = document.getElementById("work_area");
    for (var i=0; i<frames.length; i++){
        elementID = "canvas_" + String(i);
        var new_Canvas = document.createElement("canvas");
        new_Canvas.setAttribute("id", elementID);
        div.appendChild(new_Canvas);
        const canvas = document.getElementById(elementID);
        const frame = frames[i];
        canvas.width = frame.width;
        canvas.height = frame.height;
        canvas.getContext('2d').drawImage(frame, 0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = canvas.toDataURL();
        posenet_model(frame, elementID);
    }
}

async function posenet_model(frame, elementID){
    const canvas = document.getElementById(elementID);
    const context = canvas.getContext('2d');
    const model = await posenet.load()
    const pose = await model.estimateSinglePose(frame, {
        flipHorizontal: false
    });
    pose.keypoints.forEach(element => {
        const{
            x ,y
        } = element.position;
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
    });
}
