const startButton = document.getElementById('startButton');

const resetButton = document.getElementById('resetButton');

const playerName1 = document.getElementById('name1');

const playerName2 = document.getElementById('name2');

const botoes = document.querySelectorAll("button:not(#startButton, #resetButton)");

let winVerificator = false;

let drawVerificator = false

let jogador;

let playerInGame = playerName1

const currentPlayer = document.getElementById('currentPlayer')

const winsPossibles = [
  [1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]
]

const buttons = document.querySelectorAll(".button");

resetButton.disabled = true

startButton.addEventListener('click', () => {
  if (!playerName1.value || !playerName2.value) {
    return alert('Insira o nome dos jogadores!');
  }

  alert('O jogo começou!');

  currentPlayer.innerText = `Vez do jogador: ${playerName1.value}`;

  const botoes = document.querySelectorAll("button:not(#startButton, #resetButton)");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].removeAttribute("disabled");
  }

  startButton.disabled = true

  resetButton.disabled = false

  playerName1.disabled = true

  playerName2.disabled = true
});

buttons.forEach(button => {
  button.addEventListener('click', newMove);
});

function newMove(event) {

  const id = event.target.id;

  let button = document.getElementById(id);

  playerInGame === playerName1 ? button.innerText = 'X' : button.innerText = 'O'

  button.disabled = true

  checkWin(playerInGame)

  playerInGame === playerName1 ? playerInGame = playerName2 : playerInGame = playerName1

  if (playerInGame === playerName1) {
    jogador = playerName2
  }

  else {
    jogador = playerName1
  }


  winVerificator === true ? currentPlayer.innerText = `O jogador ${jogador.value} venceu!` : drawVerificator === true ? currentPlayer.innerText = `O jogo terminou em empate!` : currentPlayer.innerText = `Vez do jogador: ${playerInGame.value}`

}

resetButton.addEventListener('click', () => {

  buttons.forEach(button => {
    button.innerText = '';
  });

  playerInGame = playerName1

  currentPlayer.innerText = `Vez do jogador: ${playerInGame.value}`

  startButton.disabled = false

  resetButton.disabled = true

  for (let i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true
  }

  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove('winning-button')
  }

  playerName1.disabled = false

  playerName2.disabled = false

  winVerificator = false

  drawVerificator = false

  currentPlayer.innerText = ''

})

function checkWin(player) {
  const playerSymbol = (player === playerName1) ? 'X' : 'O';
  const playerMoves = Array.from(buttons)
    .filter(button => button.innerText === playerSymbol)
    .map(button => parseInt(button.id));

  for (let i = 0; i < winsPossibles.length; i++) {
    const [a, b, c] = winsPossibles[i];
    if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c)) {
      const playerName = (player === playerName1) ? playerName1.value : playerName2.value;
      highlightWinningSequence([a, b, c]); // Destaca a sequência vencedora
      winVerificator = true
      for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true
      }
      resetButton.disabled = false;
      return;
    }
  }

  if (Array.from(buttons).every(button => button.innerText !== '')) {
    drawVerificator = true;
    for (let i = 0; i < botoes.length; i++) {
      botoes[i].disabled = true
    }
    resetButton.disabled = false;
  }
}

function highlightWinningSequence(sequence) {
  sequence.forEach(position => {
    const button = document.getElementById(position);
    button.classList.add('winning-button');
  });
}