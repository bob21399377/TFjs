function selectvideoFile(){
    files = document.getElementById("camera").files;
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