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
    video.play()
    video.addEventListener('timeupdate', function(){
        const image = Load_Image();
        posenet_model(image);
    });
}
function Load_Image(){
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    const image = new Image()
    image.src = canvas.toDataURL()
    return image;
}
function posenet_model(imageElement){
    posenet.load().then(function(net) {
        const pose = net.estimateSinglePose(imageElement, {
            flipHorizontal: true
        });
        return pose;
        }).then(function(pose) {
            let pose_value = Object.values(Object.values(pose)[1]);
            for(let i in pose_value){
                let x = pose_value[i]['position']['x'];
                let y = pose_value[i]['position']['y'];
                console.log('[x:' + x + ', y:' + y + ']');
            }
      })
}