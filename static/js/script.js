function ageInDays() {
    let number = prompt("In what year were you born?");
    ageInDaysCalc = (2021 - number) * 365;
    document.getElementById("challenge_1_result").innerHTML = "You have lived " + ageInDaysCalc + " days.";
}

function reset() {
    document.getElementById("challenge_1_result").remove();
}

// Challenge # 2
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById("challenge_2_result");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

function reset_cat(){
    document.getElementById("challenge_2_result").innerHTML = "";
}


// Challenge # 3
// Game Code
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice =  yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log(botChoice);
    results = decideWinner(humanChoice, botChoice);  //[0,1] Human lost , computer won
    console.log(results);
    message = finalMessage(results); //{message: 'You won!', color: 'green}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        rock: {scissors:1, rock: 0.5, paper: 0},
        paper: {rock:1 ,paper:0.5, scissors:0},
        scissors: {paper:1 ,scissors:0.5, rock:0},
    }
 var yourScore  = rpsDatabase[yourChoice][computerChoice];
 var computerScore = rpsDatabase[computerChoice][yourChoice];

 return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    console.log('Your score is:' + yourScore);
    console.log('Computer score is ' + computerScore);
    if (yourScore == 0){
        return {message: 'You Lost', color: 'red'};
    } else if(yourScore == 0.5) {
        return {message: 'You tied!', color: 'yellow'};
    } else {
        return {message: 'You won!', color: 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        rock: document.getElementById('rock').src,
        paper: document.getElementById('paper').src,
        scissors: document.getElementById('scissors').src,
    }
    
    // Let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let botDiv = document.createElement('div');

    console.log("This is final Message" + finalMessage.message);
    
    humanDiv.innerHTML = '<img src="' + imagesDatabase[humanImageChoice] +'" width=150>';
    
    messageDiv.innerHTML = '<h1 style="color: ' + finalMessage['color'] + '; font-size: 60px; padding: 30px">' + finalMessage.message + '</h1>';
    botDiv.innerHTML = '<img src="' + imagesDatabase[botImageChoice] +'" width=150>';

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//Challenge 4 code
let buttons = document.getElementsByClassName("btn-color");
let copyButtons = [];

for (let i=0;i < buttons.length; i++){
    copyButtons.push(buttons[i].classList[2]);
}

console.log(copyButtons);

function buttonColorChange(buttonThingy){
    console.log(buttonThingy.value);

    if (buttonThingy.value === 'random'){
        buttonsRandom();
    } else if(buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'yellow'){
        buttonsYellow();
    } else {
        buttonsReset();
    }

}

function buttonsRandom(){
    let indexRandom = "";
    for (let i=0; i < buttons.length; i++){
        indexRandom = makeRandomNumber();
        buttons[i].classList.remove(buttons[i].classList[2])
        buttons[i].classList.add(copyButtons[indexRandom]);
    }
}

function makeRandomNumber(){
    return Math.floor(Math.random()*buttons.length);
}

function buttonsRed(){
    for (let i=0; i < buttons.length; i++){
        buttons[i].classList.remove(buttons[i].classList[2]);
        buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0;  i < buttons.length; i++){
        buttons[i].classList.remove(buttons[i].classList[2]);
        buttons[i].classList.add('btn-success');
    }
}

function buttonsYellow(){
    for(let i=0; i < buttons.length; i++){
        buttons[i].classList.remove(buttons[i].classList[2]);
        buttons[i].classList.add('btn-warning');
    }
}

function buttonsReset(){
    for(let i=0; i < buttons.length; i++){
        buttons[i].classList.remove(buttons[i].classList[2])
        buttons[i].classList.add(copyButtons[i]);        
    }
}


// Challenge 5 Blackjack code

let blackjackGame = {
    you: {scoreSpan: '#your-blackjack-score', div: '#your-box', score: 0},
    dealer: {scoreSpan: '#dealer-blackjack-score', div: '#dealer-box', score: 0},
    cards: ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    cardsMap: {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
}


 
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

// const hitSound = new Audio('static/sounds/swish.m4a');

console.log(YOU);
console.log(DEALER.div);


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
 let card = randomCard();
 console.log(card);
 showCard(YOU, card);
 updateScore(card, YOU);
 console.log(YOU.score);
 showScore(YOU);
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame["cards"][randomIndex];
} 

function showCard(activePlayer, card){
    let cardImage = document.createElement('img');
    cardImage.src = `static/img/cards/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);

    //hitSound.play();
}

function blackjackDeal(){
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    for (let i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    for (let i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        //If adding 11 keeps me below 21, and 11. Otherwise, add 1
        console.log('This is A indice 1:' + blackjackGame['cardsMap'][card][1]);
        console.log('This is A indice 0:' + blackjackGame['cardsMap'][card][0]);
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]; 
            
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]; 
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }  
}

function showScore(activePlayer){
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}