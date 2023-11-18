// DOM
let counterAciertos = document.getElementById("aciertos");
let counterFallos = document.getElementById("fallos") ;
let counterClicks = document.getElementById("clicks") ;

let tablero = document.getElementById("card-tablero") ;
let container = document.getElementById("container")

//resto
let infoButton = document.getElementById("info-button")
let infoDesp = document.getElementById("info-desp")
let previousInfo = document.getElementById("previous-data")
let winner = document.getElementById("winner")
let winnerButton = document.getElementById("winner-button")
let cardInfo = document.getElementById("card-info");
let cardText = document.getElementById("card-text")
// Arrays

// formato de cada objeto en el array de arrayCartas y array
// {
//     id: 1,
//     image: "imagen.png",
//     state: "downside" / "upside" / "resolved"
// }
let array = [
    {
        id:0,
        image: "./img/imagen.png",
        state: "downside", 
        text: "La Graciosa es la isla más pequeña del archipiélago de las Islas Canarias y se encuentra al norte de Lanzarote, es famosa por su ambiente tranquilo y relajado."
    },
    {
        id:0,
        image: "./img/imagen.png",
        state: "downside",
        text: "La Graciosa es la isla más pequeña del archipiélago de las Islas Canarias y se encuentra al norte de Lanzarote, es famosa por su ambiente tranquilo y relajado."
    },
    {
        id:1,
        image: "./img/imagen(2).png",
        state: "downside",
        text: "La laurisilva es un bosque subtropical húmedo que se caracteriza por su exuberante vegetación, que incluye árboles perennes de hojas verdes brillantes, helechos, musgos y líquenes. Estos bosques suelen estar envueltos en niebla y reciben una cantidad significativa de lluvia, lo que contribuye a su biodiversidad."
    },
    {
        id:1,
        image: "./img/imagen(2).png",
        state: "downside",
        text: "La laurisilva es un bosque subtropical húmedo que se caracteriza por su exuberante vegetación, que incluye árboles perennes de hojas verdes brillantes, helechos, musgos y líquenes. Estos bosques suelen estar envueltos en niebla y reciben una cantidad significativa de lluvia, lo que contribuye a su biodiversidad."
    },
    {
        id:2,
        image: "./img/imagen(3).jpg",
        state: "downside",
        text: 'La Palma se conoce comúnmente como "La Isla Bonita" debido a su asombrosa belleza natural, que incluye impresionantes paisajes, acantilados y exuberante vegetación.'
    },
    {
        id:2,
        image: "./img/imagen(3).jpg",
        state: "downside",
        text: 'La Palma se conoce comúnmente como "La Isla Bonita" debido a su asombrosa belleza natural, que incluye impresionantes paisajes, acantilados y exuberante vegetación.'
    },
    {
        id:3,
        image: "./img/imagen(3).png",
        state: "downside",
        text: "Fuerteventura es famosa por sus impresionantes playas de arena dorada que se extienden a lo largo de la costa. Algunas de las más populares incluyen Playa de Corralejo, Playa de Sotavento y Playa de Cofete."
    },
    {
        id:3,
        image: "./img/imagen(3).png",
        state: "downside",
        text: "Fuerteventura es famosa por sus impresionantes playas de arena dorada que se extienden a lo largo de la costa. Algunas de las más populares incluyen Playa de Corralejo, Playa de Sotavento y Playa de Cofete."
    },
    {
        id:4,
        image: "./img/imagen(4).jpg",
        state: "downside",
        text: "La Palma es uno de los mejores lugares del mundo para la observación de estrellas, gracias a su cielo limpio y su baja contaminación lumínica. El Observatorio del Roque de los Muchachos es uno de los principales observatorios astronómicos del hemisferio norte."
    },
    {
        id:4,
        image: "./img/imagen(4).jpg",
        state: "downside",
        text: "La Palma es uno de los mejores lugares del mundo para la observación de estrellas, gracias a su cielo limpio y su baja contaminación lumínica. El Observatorio del Roque de los Muchachos es uno de los principales observatorios astronómicos del hemisferio norte."
    },
    {
        id:5,
        image: "./img/imagen(4).png",
        state: "downside",
        text: "En el centro de la isla se encuentra el Parque Nacional de Garajonay, declarado Patrimonio de la Humanidad por la UNESCO. Es un bosque de laurisilva subtropical con una gran biodiversidad."
    },
    {
        id:5,
        image: "./img/imagen(4).png",
        state: "downside",
        text: "En el centro de la isla se encuentra el Parque Nacional de Garajonay, declarado Patrimonio de la Humanidad por la UNESCO. Es un bosque de laurisilva subtropical con una gran biodiversidad."
    },
    {
        id: 6,
        image: "./img/imagen(5).png",
        state: "downside",
        text: "Tiene el Pico del Teide que es el pico más alto de España y uno de los volcanes más grandes del mundo. El Parque Nacional del Teide es un destino imprescindible para los amantes de la naturaleza y ofrece una gran variedad de senderos y vistas panorámicas espectaculares. Gran parte de la isla ha sido declarada Reserva de la Biosfera por la UNESCO debido a su diversidad natural y sus esfuerzos de conservación."
    },
    {
        id: 6,
        image: "./img/imagen(5).png",
        state: "downside",
        text: "Tiene el Pico del Teide que es el pico más alto de España y uno de los volcanes más grandes del mundo. El Parque Nacional del Teide es un destino imprescindible para los amantes de la naturaleza y ofrece una gran variedad de senderos y vistas panorámicas espectaculares. Gran parte de la isla ha sido declarada Reserva de la Biosfera por la UNESCO debido a su diversidad natural y sus esfuerzos de conservación."
    },
    // {
    //     id:7,
    //     image: "./img/imagen(6).png",
    //     state: "downside"
    // },
    // {
    //     id:7,
    //     image: "./img/imagen(6).png",
    //     state: "downside"
    // }
] ; // sin randomizar
let arrayCartas = [] ; // randomizado

let currentCard = {
    card1: null,
    card2: null
}
// objeto que contiene valores relacionados con el juego
let gameData = {
    state: "start", // los valores que puede tener "start" que es antes de iniciar , "started" que es cuando se esta jugando a el juego y "end" cuando el juego se a terminado
    numPairResolved: 0 ,
    numPairUp: 0 ,
    numTotalTries : 0 ,
    numTotalClicks : 0 
}

// funcion para randomizar el array e insertarlo en el array arrayCartas
function createCards() {
    arrayCartas = array.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value) // esto randomiza el array
}

// mira el id que es la posicion de la carta en el array arrayCartas y comprueba los datos, de esta manera el usuario sola sabe el id todo son diferentes
function checkCard(e) {
    gameData.numTotalClicks += 1;
    counterClicks.innerText = gameData.numTotalClicks ;
    let card = document.getElementById(e)
    console.log(e)
    if(currentCard.card1 != null && currentCard.card2 != null){
        // este if es solo por si acaso
        checkCurrentCard();
    }else if(currentCard.card1 != null || currentCard.card2 != null){
        if(currentCard.card1 != null && currentCard.card2 == null){
            currentCard.card2 = e
            if(currentCard.card1 == currentCard.card2){
                currentCard.card2 = null ;
            }else{
                card.classList.add("upside");
                card.classList.remove("downside");
                setTimeout(() => {
                    let image = card.querySelector("img");
                    image.src = arrayCartas[currentCard.card2].image
                    arrayCartas[currentCard.card2].state = "upside";
                }, "300");
                setTimeout(() => {
                    checkCurrentCard();
                }, "1500")
            }
        }else if(currentCard.card1 == null && currentCard.card2 != null){
            currentCard.card1 = e
            if(currentCard.card1 == currentCard.card2){
                currentCard.card1 = null;
            }else{
                card.classList.add("upside");
                card.classList.remove("downside");
                setTimeout(() => {
                    let image = card.querySelector("img");
                    image.src = arrayCartas[currentCard.card1].image
                    arrayCartas[currentCard.card1].state = "upside";
                }, "300");
                setTimeout(() => {
                    checkCurrentCard();
                }, "2000")
            }
        }
    }else if(currentCard.card1 == null && currentCard.card2 == null){
        currentCard.card1 = e;
        let image = card.querySelector("img");
        card.classList.add("upside");
        setTimeout(() => {
            image.src = arrayCartas[currentCard.card1].image
            arrayCartas[currentCard.card1].state = "upside";
        },"300")
        
    }
}

function checkCurrentCard() {
    if(arrayCartas[currentCard.card1].id == arrayCartas[currentCard.card2].id){
        let carta1 = document.getElementById(currentCard.card1);
        let carta2 = document.getElementById(currentCard.card2) ;
        let imagen1 = carta1.querySelector("img");
        let imagen2 = carta2.querySelector("img");
        imagen1.src = arrayCartas[currentCard.card1].image
        imagen2.src = arrayCartas[currentCard.card2].image
        carta1.classList.remove("downside");
        carta2.classList.add("upside");
        gameData.numPairResolved += 1 ;
        counterAciertos.innerText = gameData.numPairResolved ;
        arrayCartas[currentCard.card1].state = "resolved";
        arrayCartas[currentCard.card2].state = "resolved";
        cardInfo.style.display = "block";
        cardText.innerText = arrayCartas[currentCard.card1].text ;
        carta1.removeEventListener("click",checkCard);
        carta2.removeEventListener("click",checkCard);
        currentCard.card1 = null ;
        currentCard.card2 = null ;
    }else {
        // falta funcionalidad para que cuando las 2 cartas son incorrectas 
        let carta1 = document.getElementById(currentCard.card1);
        let carta2 = document.getElementById(currentCard.card2) ;
        let imagen1 = carta1.querySelector("img");
        let imagen2 = carta2.querySelector("img");
        gameData.numTotalTries += 1;
        counterFallos.innerText = gameData.numTotalTries ;
        arrayCartas[currentCard.card1].state = "downside";
        arrayCartas[currentCard.card2].state = "downside";
        setTimeout(() => {
            carta1.classList.remove("upside");
            carta1.classList.add("downside");
            carta2.classList.remove("upside");
            carta2.classList.add("downside") ;
            console.log("dando vuelta")
            imagen1.src = "./img/backside.png";
            imagen2.src = "./img/backside.png";
            
        }, "1000");
        currentCard.card1 = null ;
        currentCard.card2 = null ;
    }
    if(arrayCartas.every((e) => e.state == "resolved")){
        winner.style.display="block"
        if(localStorage.getItem('datos')){
            let compareData = JSON.parse(localStorage.getItem('datos'))
            if(compareData.tries > gameData.numTotalTries){
                let newData = {
                    clicks: gameData.numTotalClicks,
                    tries: gameData.numTotalTries,
                }
                localStorage.removeItem('datos');
                localStorage.setItem('datos', JSON.stringify(newData))
            }
        }else {
            let newData = {
                clicks: gameData.numTotalClicks,
                tries: gameData.numTotalTries,
            }
            localStorage.setItem('datos', JSON.stringify(newData));
        }
    }
}

function drawCards() {
    // funcion que crea la carta y la inserta en el html, el id es el contador que a su vez es igual que la posicion en el array arrayCartas
    for(let i = 0 ; i < arrayCartas.length ; i++){
        let newHTML = `<img class="card-image" src="./img/backside.png" alt="imagen" ></img>` ;
        let card = document.createElement("div");
        card.id = i ;
        card.addEventListener("click", function () {checkCard(i)});
        card.innerHTML = newHTML;
        card.classList.add("card")
        tablero.appendChild(card)
    }
}

// funcion que contiene las funciones para iniciar el juego
function startGame() {
    eliminarHijos(tablero);
    createCards()
    drawCards();
    winner.style.display="none"
}

window.addEventListener("DOMContentLoaded", () => {
    startGame();
    infoButton.addEventListener("click", () => {
        infoDesp.style.display="block";
    });
    if(localStorage.getItem('datos')){
        let datos = JSON.parse(localStorage.getItem('datos'))
        previousInfo.innerHTML = `
        <h3>Mejor Intento</h3>
        <p>Total Clicks: ${datos.clicks}</p>
        <p>Total Aciertos: 7</p>
        <p>Total Fallos: ${datos.tries}</p>
        `
    }
})

function cerrarDesplegable() {
    infoDesp.style.display="none";
}

function cerrarDesplegableCard() {
    cardInfo.style.display="none";
}

function eliminarHijos(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}




// no funcional pero es para que cuando termines y ganes tengas la opcion de iniciar el juego

// function deleteWinner() {
//     let winner = document.querySelector("winner")
//     winner.remove();
//     StartGame();
// }

// window.addEventListener("click", () => {
//     if(gameData.numPairResolved == 7) {
//         setTimeout(() => {
//             let winner = document.createElement("div");
//             winner.classList.add("winner");
//             let winnerText = document.createElement("h2");
//             winnerText.innerText = "Felicidades por ganar";
//             let winnerButton = document.createElement("button");
//             winnerButton.addEventListener("click", deleteWinner);
//             winnerButton.innerText = "Pulsa para jugar de nuevo"
//             winner.appendChild(winnerText);
//             winner.appendChild(winnerButton);
//             container.appendChild(winner);
//         }, "5000")
//         let confett = new confetti('winButton');
//         confett.setCount(75);
//         confett.setSize(1);
//         confett.setPower(25);
//         confett.setFade(false);
//     }
//     })


function say(m) {
    var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    speechSynthesis.speak(msg);
}