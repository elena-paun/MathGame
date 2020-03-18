const choices = document.querySelectorAll('.box');
let correctAnswer;
let timeleft;
let playing = false;
//change button to reset


const generateNumbers = () => {
    let numberOne = Math.floor(Math.random() * 15).toString();
    let numberTwo = Math.floor(Math.random() * 15).toString();
    let result = numberOne * numberTwo;

    let randomBox = Math.abs(Math.ceil(Math.random() * choices.length - 1));

    choices[randomBox].innerText = result;
    for (let i = 0; i < choices.length; i++) {
        if (choices[i] !== choices[randomBox]) {
            let wrongChoice = Math.floor(Math.random() * 15);
            if (wrongChoice == result) {
                wrongChoice = Math.floor(Math.random() * 15);
            }
            choices[i].innerText = wrongChoice;
        }

    }

    document.getElementById('question').innerText = numberOne + 'x' + numberTwo;
    return result;
};

const incrementScore = () => {
    let scorevalue = document.getElementById('scorevalue').innerText++;
    document.getElementById('finalScore').innerText = scorevalue + 1;

}



choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (playing == false) {
            return;
        }

        if (correctAnswer == e.target.innerText) {

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




let x = document.getElementById("startreset");


document.getElementById('startreset').addEventListener('click', e => {
    timeleft = 6;

    if (playing == true) {
        document.getElementById("startreset").innerHTML = "start Game";
        correctAnswer = generateNumbers();
        hide('gameOver');

        //location.reload();


    } else if (playing == false) {
        // document.location.reload();

        document.getElementById("startreset").innerHTML = "Start Game";
        correctAnswer = generateNumbers();
        document.getElementById('scorevalue').innerText = 0;

        hide('gameOver');
    }
    //timer();
})


//let x = document.getElementById("startreset");
//const timer = () => {
downloadTimer = setInterval(e => {

    if (timeleft <= 0) {
        stopCountdown();
        x.innerText = "Start Game";
        //playing = false;
        show('gameOver');


    } else {
        hide('gameOver');
        timeleft--;
        x.innerText = "Reset Game";
        playing = true;
    }

    document.getElementById("timeremainingvalue").innerText = timeleft;


}, 1000);
//}

const stopCountdown = () => {
    clearInterval(downloadTimer);
}

const hide = Id => {
    document.getElementById(Id).style.display = "none";
}

const show = Id => {
    document.getElementById(Id).style.display = "block";
}