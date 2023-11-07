// DOM
let counterAciertos = document.getElementById("aciertos");
let counterFallos = document.getElementById("fallos") ;

let tablero = document.getElementById("card-tablero") ;

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
        state: "downside"
    },
    {
        id:0,
        image: "./img/imagen.png",
        state: "downside"
    },
    {
        id:1,
        image: "./img/imagen(2).png",
        state: "downside"
    },
    {
        id:1,
        image: "./img/imagen(2).png",
        state: "downside"
    },
    {
        id:2,
        image: "./img/imagen(3).jpg",
        state: "downside"
    },
    {
        id:2,
        image: "./img/imagen(3).jpg",
        state: "downside"
    },
    {
        id:3,
        image: "./img/imagen(3).png",
        state: "downside"
    },
    {
        id:3,
        image: "./img/imagen(3).png",
        state: "downside"
    },
    {
        id:4,
        image: "./img/imagen(4).jpg",
        state: "downside"
    },
    {
        id:4,
        image: "./img/imagen(4).jpg",
        state: "downside"
    },
    {
        id:5,
        image: "./img/imagen(4).png",
        state: "downside"
    },
    {
        id:5,
        image: "./img/imagen(4).png",
        state: "downside"
    },
    {
        id: 6,
        image: "./img/imagen(5).png",
        state: "downside"
    },
    {
        id: 6,
        image: "./img/imagen(5).png",
        state: "downside"
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
    numTotalTries : 0 
}

// funcion para randomizar el array e insertarlo en el array arrayCartas
function createCards() {
    arrayCartas = array.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value) // esto randomiza el array
}

// mira el id que es la posicion de la carta en el array arrayCartas y comprueba los datos, de esta manera el usuario sola sabe el id todo son diferentes
function checkCard(e) {
    // if(currentCard.card1 == null && currentCard.card2 == null){
    //     currentCard.card1 == e.id
    // }else if(currentCard.card1 != null){
        
    // }else if(currentCard.car)
    let card = document.getElementById(e)
    console.log(e)
    if(currentCard.card1 != null && currentCard.card2 != null){
        // aqui hacer que las todas las cartas se den la vuelta
        checkCurrentCard();
    }else if(currentCard.card1 != null || currentCard.card2 != null){
        if(currentCard.card1 != null && currentCard.card2 == null){
            currentCard.card2 = e
            card.classList.add("upside");
            setTimeout(() => {
                let image = card.querySelector("img");
                image.src = arrayCartas[currentCard.card2].image
                arrayCartas[currentCard.card2].state = "upside";
            }, "300");
        }else if(currentCard.card1 == null && currentCard.card2 != null){
            currentCard.card1 = e
            card.classList.add("upside");
            setTimeout(() => {
                let image = card.querySelector("img");
                image.src = arrayCartas[currentCard.card1].image
                arrayCartas[currentCard.card1].state = "upside";
            }, "300");
            
        }
    }else if(currentCard.card1 == null && currentCard.card2 == null){
        currentCard.card1 = e;
        let image = card.querySelector("img");
        image.src = arrayCartas[currentCard.card1].image
        arrayCartas[currentCard.card1].state = "upside";
        card.classList.add("upside");
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
            console.log("dando vuelta")
            imagen1.src = "./img/backside.png";
            imagen2.src = "./img/backside.png";
            carta1.classList.remove("upside");
            carta1.classList.add("downside");
            carta2.classList.remove("upside");
            carta2.classList.add("downside") ;
        }, "700");
        currentCard.card1 = null ;
        currentCard.card2 = null ;
    }
}

function drawCards() {
    // funcion que crea la carta y la inserta en el html, el id es el contador que a su vez es igual que la posicion en el array arrayCartas
    for(let i = 0 ; i <= arrayCartas.length ; i++){
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
function StartGame() {
    createCards()
    drawCards();
}

window.addEventListener("DOMContentLoaded", () => {
    StartGame();
})