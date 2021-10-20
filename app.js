(function () {
    const inputElm = document.querySelector('#input');
    const formElm = document.querySelector('form');
    const winScoreElm = document.querySelector('.winScore');
    const p1BtnElm = document.querySelector('.p1Btn');
    const p1ScoreElm = document.querySelector('.p1Score');
    const p2BtnElm = document.querySelector('.p2Btn');
    const p2ScoreElm = document.querySelector('.p2Score');
    const resetElm = document.querySelector('.reset');

    let winScore = 20;
    let p1Score = 0;
    let p2Score = 0;
    let turn = 'player1';

    // initial number
    winScoreElm.textContent = winScore;
    p1ScoreElm.textContent = p1Score;
    p2ScoreElm.textContent = p2Score;

    // generate random number
    function generateRandomNum(max) {
        return Math.ceil(Math.random() * max);
    }

    formElm.addEventListener('submit', e => {
        e.preventDefault();
        const invalidValue = Number(inputElm.value);
        if (invalidValue === '' || invalidValue < 1) {
            if (!document.querySelector('.invalid-input')) {
                formElm.insertAdjacentHTML('beforebegin',
                    '<p class="invalid-input">Please provide a valid number</p>')
            }
        } else {
            if (document.querySelector('.invalid-input')) {
                document.querySelector('.invalid-input').remove();
            }
            // setting data layer
            winScore = Number(inputElm.value);
            // setting view layer
            winScoreElm.textContent = winScore;
            // clear the input
            inputElm.value = '';
            // change all state except win score
            initialPlayState();
        }
    });

    p1BtnElm.addEventListener('click', e => {
        if (turn === 'player1') {
            p1Score = generateRandomNum(winScore);
            p1ScoreElm.textContent = p1Score;
            turn = 'player2';
            p1BtnElm.setAttribute('disabled', 'disabled');
            p2BtnElm.removeAttribute('disabled');
            checkWinner();
        }
    });

    p2BtnElm.addEventListener('click', e => {
        if (turn !== 'player') {
            p2Score = generateRandomNum(winScore)
            p2ScoreElm.textContent = p2Score;
            turn = 'player1';
            p2BtnElm.setAttribute('disabled', 'disabled');
            p1BtnElm.removeAttribute('disabled');
            checkWinner();
        }
    });

    function checkWinner() {
        const isP1Winner = winScore === p1Score;
        const isP2Winner = winScore === p2Score;
        // console.log(isP1Winner, isP2Winner);
        if (isP1Winner || isP2Winner) {
            p1BtnElm.setAttribute('disabled', 'disabled');
            p2BtnElm.setAttribute('disabled', 'disabled');
        }
        displayWinner(isP1Winner, isP2Winner);
    }

    function displayWinner(p1WinState, p2WinState) {
        if (p1WinState) {
            formElm.insertAdjacentHTML('beforebegin',
                '<p class="winMsg">Player1 is Winner</p>')
        } else if (p2WinState) {
            formElm.insertAdjacentHTML('beforebegin',
                '<p class="winMsg">Player2 is Winner</p>')
        }
    }

    // reset all 
    resetElm.addEventListener('click', e => {
        winScore = 20;
        initialPlayState();
    })
    function initialPlayState() {
        p1Score = 0;
        p2Score = 0;
        turn = 'player1';

        winScoreElm.textContent = winScore;
        p1ScoreElm.textContent = p1Score;
        p2ScoreElm.textContent = p2Score;
        p1BtnElm.removeAttribute('disabled');
        p2BtnElm.removeAttribute('disabled');
        /// reset win massage
        if (document.querySelector('.winMsg')) {
            document.querySelector('.winMsg').remove();
        }
    }
}
)();
