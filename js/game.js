const choices = document.querySelectorAll('.box');
let timeleft;
let correctAnswer;
let action;
let playing = false;
let score;

document.getElementById("startreset").innerText = "start Game";

document.getElementById('startreset').addEventListener('click', e => {

    if (playing == true) {
        location.reload();

    } else {
        show('timeremaining');
        playing = true;
        //set score to 0
        score = 0;
        timeleft = 5;
        document.getElementById("timeremainingvalue").innerHTML = timeleft;
        document.getElementById('scorevalue').innerText = score;
        hide("gameOver");
        document.getElementById("startreset").innerHTML = "Reset Game";
        timer()

        correctAnswer = generateNumbers();
    }


})

const generateNumbers = () => {
    let numberOne = Math.floor(Math.random() * 15).toString();
    let numberTwo = Math.floor(Math.random() * 15).toString();
    let result = numberOne * numberTwo;
    let answers = [result];
    let randomBox = Math.abs(Math.ceil(Math.random() * choices.length - 1));
    //let correctPosition = Math.floor(Math.random() * 3);
    choices[randomBox].innerText = result;
    for (let i = 0; i < choices.length; i++) {
        if (choices[i] !== choices[randomBox]) {
            let wrongChoice;
            do {
                wrongChoice = Math.floor(Math.random() * 15);
            } while (answers.indexOf(wrongChoice) > -1)
            answers.push(wrongChoice)
            // if (array[i] == wrongChoice) {
            //     let newwrongChoice = Math.floor(Math.random() * 15);
            //     choices[i].innerText = newwrongChoice;
            // }
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


//change button to reset


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



//let x = document.getElementById("startreset");
const timer = () => {

    action = setInterval(e => {

        timeleft--;
        document.getElementById("timeremainingvalue").innerText = timeleft;
        if (timeleft <= 0) {
            stopCountdown();
            document.getElementById("startreset").innerText = "start Game";
            //playing = false;
            show('gameOver');
            correctAnswer = generateNumbers();
        }

        // } else if (timeleft > 0) {
        //     stopCountdown();
        //     x.innerText = "start Game";
        //     //playing = false;
        //     hide('gameOver');
        // } else {
        //     hide('gameOver');
        //     timeleft--;
        //     x.innerText = "start Game";
        //     playing = true;
        // }

        // document.getElementById("timeremainingvalue").innerText = timeleft;

    }, 1000);
}

const stopCountdown = () => {
    clearInterval(action);
}

const hide = Id => {
    document.getElementById(Id).style.display = "none";
}

const show = Id => {
    document.getElementById(Id).style.display = "block";
}