async function submitGuess(){
    let guess = $("#guess").val()
    try{
    const result = await axios.post('http://127.0.0.1:5000/board', {
        guess: guess
    })
    show_word_status(result)
}
    catch (error) {
        console.log(guess)
        console.log(error)
    }
}

function show_word_status(result){
    let parent = document.querySelector('.container');
    let messageContent = result.data.result;
    let message = document.createElement('p');
    message.innerText = messageContent.replaceAll('-', ' ');
    parent.append(message)
    update_message_id(message)
}

let score = 0;

function update_message_id(message){
    if(message.innerText === 'not on board' || message.innerText === 'not a word'){
        message.classList.add('bad-word')
    } else {
        message.classList.add('good-word')
        let guess = $("#guess").val();
        let HTMLScore = document.querySelector('.score');
        for(letter in guess){
            score++
            HTMLScore.innerText = `Score: ${score}`
        }
    }
}

function remove_old_messages(){
    let parent = document.querySelector('.container')
    let child = document.querySelector('p')
    if (parent.contains(child)){
        let oldMesssage = document.querySelector('p');
        oldMesssage.remove();
    } else {
        return null;
    }
}

let seconds = 60;
let timer;

function timerFunc() {
    if(seconds < 60) {
        document.getElementById('timer').innerHTML = seconds;
    }
    if(seconds > 0){
        seconds--;
    } else {
        clearInterval(timer);
        alert(`Congrats! Your score was ${score}!`)
        document.getElementById('submit-guess').disabled = true;
        homeButton();
    }
}

function homeButton(){
    let parent = document.querySelector('#home-button');
    let button = document.createElement('button');
    button.innerText = 'Return to home';
    parent.append(button);
}


$('#submit-guess').on("click", function(evt){
    evt.preventDefault();
    submitGuess();
    remove_old_messages()
    if (!timer) {
        timer = window.setInterval(function() {
            timerFunc()
        }, 1000)
    }
})


