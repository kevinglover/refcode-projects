let playerChoice = {
    player1: "",
    player2: "",
  }
  
  const playerKeys = {
    player1: ["Digit1", "Digit2", "Digit3"],
    player2: ["Digit8", "Digit9", "Digit0"],
    submit: "Enter",
  }
  
  const selection = ["",  "🗿", "📄", "✂️"];
  
  const setOption = (button, selectionIndex) => {
    const player = button.dataset.player === "1" ?
      "player1" : "player2";
    playerChoice[player] = selectionIndex;
    button.innerText = selection[selectionIndex] || "";
  }
  
  const onButtonClick = ({ target:button }) => {
    const option = selection.indexOf(button.innerText) + 1;
    setOption(button, option);
  };
  
  const getResults = ({ player1, player2 }) => {
    if (player1 === 1 && player2 === 2
        || player1 === 2 && player2 === 3
        || player1 === 3 && player2 === 1
    ) {
      return `${selection[player2]} beats ${selection[player1]}. Player 2 Wins!`;
    }
    
    if (player1 === 2 && player2 === 1
        || player1 === 3 && player2 === 2
        || player1 === 1 && player2 === 3) {
      return `${selection[player1]} beats ${selection[player2]}. Player 1 Wins!`;
    }
    
    if (selection[player1] && selection[player2]) {
      return `${selection[player1]} and ${selection[player2]}. Draw!`;
    }
    
    return "We need a choice from player: "
      + (!selection[player1] ? "Player1 " : "")
      + (!selection[player2] ? "Player2" : "");
  }
  
  const clearGame = () => {
    playerChoice.player1 = 0;
    playerChoice.player2 = 0;
    const buttons = document.getElementsByClassName("player-area__selection");
    [...buttons].map(button => {
      button.classList.remove("ready");
      button.innerText = "";
    });
  }
  
  const setResults = () => {
    document.getElementsByClassName("results")[0].innerText = getResults(playerChoice);
    clearGame();
  }
  
  const logKey = ({ code }) => {
    console.log(code);
    switch (code) {
      case playerKeys.player1[0]:
        playerChoice.player1 = 1;
        break;
      case playerKeys.player1[1]:
        playerChoice.player1 = 2;
        break;
      case playerKeys.player1[2]:
        playerChoice.player1 = 3;
        break;
      case playerKeys.player2[0]:
        playerChoice.player2 = 1;
        break;
      case playerKeys.player2[1]:
        playerChoice.player2 = 2;
        break;
      case playerKeys.player2[2]:
        playerChoice.player2 = 3;
        break;
      case playerKeys.submit:
        setResults();
      default:
        return;
    }
    
      const buttons = document.getElementsByClassName("player-area__selection");
      if (playerChoice.player1) {
        console.log(buttons[0].classList);
        buttons[0].classList.add("ready");
      }
      if (playerChoice.player2) {
        buttons[1].classList.add("ready");
      }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.getElementsByClassName("player-area__selection");
    [...buttons].map(button => button.onclick = onButtonClick);
    
    document.getElementsByClassName("submit")[0].onclick = setResults;
    document.addEventListener('keydown', logKey);
  });
  