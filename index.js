async function Model() {
    // Load Model
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/bob21399377/TFjs/main/model/model.json');
    //Make Test Data
    let fake_input1 = [0.1];
    let fake_input2 = [0.1];
    for(let i = 1;i<1*30*6*2;i++){
        fake_input1.push(Math.random());
        fake_input2.push(Math.random());
    }
    for (let i = 0;i<1*30*6;i++){
        fake_input1.push(Math.random());
    }
    let a = tf.tensor4d(fake_input1,[1,30,6,3],dtype='float32');
    let b = tf.tensor4d(fake_input2,[1,30,6,2],dtype='float32');
    // Model predict
    const ouput = model.predict([a, b]);
    // Print
    document.getElementById("result").innerHTML = ouput.arraySync()[0][0];
}