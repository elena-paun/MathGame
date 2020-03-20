const choices = document.querySelectorAll('.box');

let timeleft, correctAnswer, action, score, playing = false;

//hide an element 
const hide = Id => {
    document.getElementById(Id).style.display = "none";
}

//show an element
const show = Id => {
    document.getElementById(Id).style.display = "block";
}

hide("timeRemaining");

document.getElementById("startReset").innerText = "start Game";

document.getElementById('startReset').addEventListener('click', e => {

    if (playing == true) {
        location.reload();
    } else {
        show('timeRemaining');
        playing = true;
        //set score to 0
        score = 0;
        timeleft = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeleft;
        document.getElementById('scoreValue').innerText = score;
        hide("gameOver");
        document.getElementById("startReset").innerHTML = "Reset Game";
        timer()
        correctAnswer = generateNumbers();
    }
})

//generate question and multiple answers 
const generateNumbers = () => {
    let numberOne = Math.floor(Math.random() * 15).toString();
    let numberTwo = Math.floor(Math.random() * 15).toString();
    let result = numberOne * numberTwo;
    let answers = [result];
    let randomBox = Math.abs(Math.ceil(Math.random() * choices.length - 1));

    choices[randomBox].innerText = result;

    //fill other boxes with wrong answers 
    for (let i = 0; i < choices.length; i++) {
        if (choices[i] !== choices[randomBox]) {
            let wrongChoice;
            do {
                wrongChoice = Math.floor(Math.random() * 15);
            } while (answers.indexOf(wrongChoice) > -1)
            answers.push(wrongChoice)

            choices[i].innerText = wrongChoice;
        }
    }
    document.getElementById('question').innerText = numberOne + 'x' + numberTwo;
    return result;
};

const incrementScore = () => {
    let scoreValue = document.getElementById('scoreValue').innerText++;
    document.getElementById('finalScore').innerText = scoreValue + 1;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {

        if ((correctAnswer) == e.target.innerText) {

            incrementScore();

            show('correct');
            setTimeout(e => {
                hide('correct');
            }, 1000);
            correctAnswer = generateNumbers();
        } else {
            show('wrong');
            setTimeout(e => {
                hide('wrong');

            }, 1000);
        }
    })
});


const timer = () => {

    action = setInterval(e => {

        timeleft--;
        document.getElementById("timeRemainingValue").innerText = timeleft;
        if (timeleft <= 0) {
            stopCountdown();
            document.getElementById("startReset").innerText = "start Game";
            //playing = false;
            show('gameOver');
            correctAnswer = generateNumbers();
        }
    }, 1000);
}

//stop counter
const stopCountdown = () => {
    clearInterval(action);
    hide("timeRemaining");
};