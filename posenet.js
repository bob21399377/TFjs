function posenet_model(){
    var imageElement = document.getElementById('image');
    posenet.load().then(function(net) {
        const pose = net.estimateSinglePose(imageElement, {
            flipHorizontal: true
        });
        return pose;
        }).then(function(pose) {
            console.log(pose);
            console.log("第一層");
            console.log(Object.values(pose));
            console.log("第二層");
            console.log(Object.values(Object.values(pose)[1]));
            console.log("第三層");
            let pose_value = Object.values(Object.values(pose)[1]);
            for(let i in pose_value){
                let x = pose_value[i]['position']['x'];
                let y = pose_value[i]['position']['y'];
                console.log('x:'+x);
                console.log('y:'+y);
            }
      })
}

function selectImgFile(files){
    if (!files.length) {
        return false;
    }
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function () {
        document.getElementById('image').src = this.result;
    };
    reader.readAsDataURL(file);
}
