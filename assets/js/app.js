let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  console.log(deck);

  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
};

crearDeck();

const getCard = () => {
  if (deck.length === 0) {
    throw " No hay mas cartas en el  deck ";
  }
  const card = deck.pop();

  return card;
};

// getCard();

const valorCard = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const btnGetCard = document.querySelector("#btnGetCard");
const small = document.querySelectorAll("small");
const gamerDiv = document.querySelector("#gamer-cards");
const computerDiv = document.querySelector("#computer-cards");
const btnStop = document.querySelector("#btnStop");
const btnNewGame = document.querySelector("#btnNewGame");

let gamerPoints = 0;
let computerPoints = 0;

btnGetCard.addEventListener("click", () => {
  const card = getCard();
  gamerPoints = gamerPoints + valorCard(card);
  console.log(gamerPoints);
  small[0].innerText = gamerPoints;

  const imgCard = document.createElement("img");
  imgCard.src = `./cartas/${card}.png`;
  imgCard.classList.add("cards");
  gamerDiv.append(imgCard);

  if (gamerPoints > 21) {
    console.log("Lo siento perdiste, intentalo de nuevo");
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    computerturn(gamerPoints);
  } else if (gamerPoints === 21) {
    console.warn("21, Genial bien echo ");
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    computerturn(gamerPoints);
  }
});

const computerturn = (points) => {
  do {
    const card = getCard();
    computerPoints = computerPoints + valorCard(card);

    small[1].innerText = computerPoints;

    const imgCard = document.createElement("img");
    imgCard.src = `./cartas/${card}.png`;
    imgCard.classList.add("cards");
    computerDiv.append(imgCard);

    if (points > 21) {
      break;
    }
  } while (computerPoints < points && points <= 21);

  setTimeout(() => {
    if (gamerPoints <= 21 && gamerPoints > computerPoints) {
      alert("felicitaciones Ganaste");
    } else if ((computerPoints <= 21) & (computerPoints > gamerPoints)) {
      alert("Computadora Gano ");
    } else if (gamerPoints === computerPoints) {
      alert("Nadie Gano");
    } else if (computerPoints > 21) {
      alert("Felictaciones Ganaste");
    } else if (gamerPoints > 21) {
      alert("Lo siento perdiste, intentalo de nuevo");
    }
  }, 50);
};

btnStop.addEventListener("click", () => {
  btnGetCard.disabled = true;
  btnStop.disabled = true;
  computerturn(gamerPoints);
});

btnNewGame.addEventListener("click", () => {
  console.clear();
  let newDeck = [];
  newDeck = crearDeck();
  gamerPoints = 0;
  computerPoints = 0;
  small[0].innerText = 0;
  small[1].innerText = 0;
  btnGetCard.disabled = false;
  btnStop.disabled = false;
  gamerDiv.innerText = "";
  computerDiv.innerText = "";
});
