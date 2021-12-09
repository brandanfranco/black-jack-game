(() => {
  let deck = [],
    pointsGamers = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  const initializationGame = (numGamers = 2) => {
    crearDeck();
    for (let index = 0; index < numGamers; index++) {
      pointsGamers.push(0);
    }

    console.log(pointsGamers);
  };

  const crearDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  const getCard = () => {
    if (deck.length === 0) {
      throw " No hay mas cartas en el  deck ";
    }

    return deck.pop();
  };

  // getCard();

  const valorCard = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const btnGetCard = document.querySelector("#btnGetCard"),
    small = document.querySelectorAll("small"),
    // gamerDiv = document.querySelector("#gamer-cards"),
    //computerDiv = document.querySelector("#computer-cards"),
    divCards = document.querySelectorAll(".divCards"),
    btnStop = document.querySelector("#btnStop"),
    btnNewGame = document.querySelector("#btnNewGame");

  // let gamerPoints = 0,
  // computerPoints = 0;

  btnGetCard.addEventListener("click", () => {
    const card = getCard();
    const gamerPoints = totalPoints(card, 0);

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

  // turn 0 : jugador 1,  turn 1 computerturn "la ultima posicion del arreglo pointsGamers siempre es la computadora en caso de que hayan varios jugadores  "

  const totalPoints = (card, turn) => {
    pointsGamers[turn] = pointsGamers[turn] + valorCard(card);
    small[turn].innerText = pointsGamers[turn];
    return pointsGamers[turn];
  };

  const computerturn = (points) => {
    do {
      const card = getCard();
      totalPoints(card, pointsGamers.length - 1);

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
    }, 30);
  };

  btnStop.addEventListener("click", () => {
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    computerturn(gamerPoints);
  });

  btnNewGame.addEventListener("click", () => {
    console.clear();
    initializationGame();
    // deck = [];
    // deck = crearDeck();
    // gamerPoints = 0;
    // computerPoints = 0;
  });
})();
